# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import requests
# import googlemaps
# from datetime import datetime
load_dotenv()

# gmaps = googlemaps.Client(key=os.get('api_key'))

# Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
# now = datetime.now()
# directions_result = gmaps.directions("Sydney Town Hall",
#                                      "Parramatta, NSW",
#                                      mode="transit",
#                                      departure_time=now)

# Validate an address with address validation
# addressvalidation_result =  gmaps.addressvalidation(['1600 Amphitheatre Pk'], 
#                                                     regionCode='US',
#                                                     locality='Mountain View', 
#                                                     enableUspsCass=True)

# Set the latitude and longitude coordinates for the starting and destination points
lat1 = 37.7749
lon1 = -122.4194
lat2 = 34.0522
lon2 = -118.2437

# Use the OpenStreetMap Nominatim API to convert coordinates to addresses
geocoding_url = lambda lat, lon : f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
response = requests.get( )
data = response.json()
start_address = data["display_name"]

geocoding_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat2}&lon={lon2}&format=json"
response = requests.get(geocoding_url)
data = response.json()
destination_address = data["display_name"]

# Use the OpenStreetMap Directions API to request driving directions
routing_url = f"https://router.project-osrm.org/route/v1/driving/{lon1},{lat1};{lon2},{lat2}?overview=false"
response = requests.get(routing_url)
data = response.json()

# Extract the driving distance from the response
distance = data["routes"][0]["distance"] / 1000  # Convert meters to kilometers

# Print the driving distance and addresses
print(f"Starting Point: {start_address}")
print(f"Destination: {destination_address}")
print(f"The driving distance is: {distance} km")


# creating a Flask app
app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def home():
    if(request.method == 'GET'):
  
        data = "hello world"
        return jsonify({'data': data})


@app.route('/', methods = ['POST'])
def nearest_ppl():
    pass
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)