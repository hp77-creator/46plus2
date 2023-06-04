def all_ppl_locations(db):
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
        data[count]['id'] = doc.id
        count += 1
    
    return data

if __name__ == "__main__":
    data = all_ppl_locations()
    for d in data:
        print(d)