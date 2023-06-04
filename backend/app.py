# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from util import *
import requests
import firebase_admin
from firebase_admin import firestore, credentials
import json
import datetime
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
    try:
        data = all_ppl_locations(db=db)
        return jsonify({"data" : data})
    except Exception as e:
        return jsonify({
            'error' : e
        })

@app.route('/user/bookings/fetch-all', methods = ['POST'])
def fetch_all_bookings_of_user():
    try:
        data = request.get_json()
        user_id = data['user_id']
        booking_db = db.collection('users').document(user_id).collection('bookings')
        booking_doc = booking_db.get()
        bookings_data = []
        for book in booking_doc:
            book_data = book.to_dict()
            book_data['id'] = book.id
            bookings_data.append(book_data)
        
        return jsonify({
            'bookings' : bookings_data
        })

    except Exception as e:
        return jsonify({
            'error' : str(e)
        })

@app.route("/allocate", methods=["POST"])
def book_slot():
    try:
        data = request.get_json() 
        bookingdoc_ref = db.document('users/'+data['user_id']+'/bookings/'+data['booking_id'])
        ppl_db = bookingdoc_ref.get()
       
        booking_object = ppl_db.to_dict()
        # This check is to allow multiple chec
        if("status" in booking_object and (booking_object['status'] == "completed" or booking_object['status'] == "onboarded") ):
            return jsonify({'error':'Ticket is already used, please purchase another ticket! Thank You.'})

        location_ref = booking_object['location_id']

        location_object = location_ref.get().to_dict()
        
        all_slots = location_object['slots']
        selected_slot = None
        selected_index = -1
        tmp_index = -1
        # linear algorithm to check which slots are available
        for eachslot in all_slots:
            tmp_index = tmp_index+1
            if 'isLocked' in eachslot and  eachslot['isLocked'] == True:
                continue
            else:
                selected_index = tmp_index
                selected_slot = eachslot
                break;
        
        if(selected_slot == None):
            return jsonify({'error':'No seats left!'})

        print(selected_index)
        all_slots[selected_index]['isLocked'] = True 
        bookingdoc_ref.update({"status":"onboarded"})
        bookingdoc_ref.update({"seat_no":selected_index})
        location_ref.update({"slots":all_slots})
        return jsonify({
            'status' : "OK",
            "seat_alloted":selected_slot
        })


    except Exception as e:
        print(e)
        return jsonify({
            'error' : e
        })

@app.route("/deallocate", methods=['POST'])
def unbook_slot():
    try:
        data = request.get_json() 
        bookingdoc_ref = db.document('users/'+data['user_id']+'/bookings/'+data['booking_id'])
        ppl_db = bookingdoc_ref.get()
       
        booking_object = ppl_db.to_dict()
        location_ref = booking_object['location_id']

        location_object = location_ref.get().to_dict()
        all_slots = location_object['slots']
        
        selected_index = booking_object['seat_no']
        print(selected_index)
        all_slots[selected_index]['isLocked'] = False

        # now updating all the slots there
        location_ref.update({"slots":all_slots})
        bookingdoc_ref.update({"status":"completed"})
        return jsonify({'status':"Ok", "message":"Deallocated"})

    except Exception as e:
        print(e)
        return jsonify({
            'error' : e
        })
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True, port=8080)