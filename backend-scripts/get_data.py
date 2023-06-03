import requests
from urllib.parse import quote
import os
from requests.structures import CaseInsensitiveDict
from dotenv import load_dotenv
import json
import firebase_admin
from firebase_admin import firestore, credentials

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

load_dotenv()

API_KEY=os.getenv('GEOCODING_API_KEY')

ppls = ['Near Artesia Building, Lower Parel',
'Altamount Road, Kemps Corner',
'Near Elko Market, Bandra',
'BMC parking, Kurla West',
'Near Boomerang Building, Kurla (West)',
'Topiwala Market Building, Kurla (W)',
'One IndiaBulls, Lower Parel',
'Cygnus Tower, Santa Cruz (E)',
'Lodha Excelus , NM Joshi Marg',
'Runwal Green, GMLR, Nahur',
'Kalpataru Avana building, Parel-Sewri division',
'Insignia building, Santacruz (E)',
'Runwal Anthurium, Mulund (W)',
'Lodha Supreme building, Kanjurmarg',
'Runwal building, Nepean Sea Road',
'Behind Umiya Mata Temple, Goregaon (E)']

for index, ppl in enumerate(ppls):
    data = {
        "available_count": 100,
        "slots": [
            {
                "slot_id": 1,
                "floor_number": 1,
                "slot_number": 2
            }
        ]
    }
    ppl = ppl + ", Mumbai, India"
    data["name"] = ppl
    encoded_ppl = quote(ppl)
    url = f"https://api.geoapify.com/v1/geocode/search?text={encoded_ppl}&apiKey={API_KEY}"
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"

    resp = requests.get(url, headers=headers)
    resp_json = resp.json()
    # print(resp.json())
    # print(resp_json["features"][0]["properties"]["lat"]) - working
    lat = resp_json["features"][0]["properties"]["lat"] 
    lon = resp_json["features"][0]["properties"]["lon"]
    data["location"] = firestore.GeoPoint(lat, lon)
    doc_ref = db.collection('ppl_locations').document()
    doc_ref.set(data)
    # with open(f'final_resp_{index}.json', 'a') as write_file:
    #     json.dump(resp.json(), write_file)

