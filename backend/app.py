# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from util import *
import requests
import firebase_admin
from firebase_admin import firestore, credentials
load_dotenv()

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# creating a Flask app
app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home():
    if(request.method == 'GET'):
  
        data = "hello world"
        return jsonify({'data': data})

def get_driving_distance(lat1, lon1, lat2, lon2):
    # Use the OSRM API to calculate the driving distance
    url = f"http://router.project-osrm.org/route/v1/driving/{lon1},{lat1};{lon2},{lat2}"
    response = requests.get(url)
    data = response.json()

    # Extract the driving distance from the API response
    key_s = data.keys()
    if 'routes' in key_s:
        distance = data['routes'][0]['distance']  # Distance in meters
    else:
        return 'inf'
    # print(distance)
    return distance

@app.route("/closest-point", methods=["POST"])
def find_closest_point():
    try:
        data = request.get_json()
    
        lat = data["lat"]
        lon = data["lon"]

        # Retrieve all data points from the Firestore collection
        collection_ref = db.collection("ppl_locations")
        docs = collection_ref.get()

        closest_distance = float("inf")
        closest_point = None

        # Iterate through all data points and find the closest one
        for doc in docs:
            doc_data = doc.to_dict()
            point_geopoint = doc_data["location"]

            # Retrieve latitude and longitude from the GeoPoint
            point_lat = point_geopoint.latitude
            point_lon = point_geopoint.longitude

            # Calculate the driving distance using an external API (e.g., Google Maps)
            distance = get_driving_distance(lat, lon, point_lat, point_lon)

            # Check if the current data point is the closest so far
            if distance < closest_distance:
                closest_distance = distance
                closest_point = {
                    "latitude": point_lat,
                    "longitude": point_lon
                } 

        return jsonify({
            "closest_point": closest_point,
            "distance": closest_distance
        })
    except Exception as e:
        # print(e)
        return jsonify({
            'error' : e
        })

@app.route("/fetch-all", methods=["GET"])
def fetch_and_return_all_data():
    data = all_ppl_locations(db=db)
    return jsonify({"data" : data})

@app.route("/book", methods=["POST"])
def book_slot():
    try:
        data = request.get_json()
        collection_ref = db.collection("users").document(data['user_id']).collection('bookings')
        doc_ref = collection_ref.document()
        data.pop('user_id')
        data['location_id'] = "/ppl_locations/" + data['location_id']
        doc_ref.set(data)
        return jsonify({
            'status' : "OK"
        })
    except Exception as e:
        print(e)
        return jsonify({
            'error' : e
        })
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)