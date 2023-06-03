import firebase_admin
from firebase_admin import firestore, credentials

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def all_ppl_locations():
    collection_ref = db.collection("ppl_locations")
    docs = collection_ref.get()
    data = list()
    count = 0
    for doc in docs:
        doc_data = doc.to_dict()
        data.append(doc_data)
        point_geopoint = doc_data["location"]

        # Retrieve latitude and longitude from the GeoPoint
        point_lat = point_geopoint.latitude
        point_lon = point_geopoint.longitude
        data[count]['location'] = {'lat' : point_lat, 'lon' : point_lon}
        count += 1
    
    return data

if __name__ == "__main__":
    data = all_ppl_locations()
    for d in data:
        print(d)