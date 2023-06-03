import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
from tqdm import tqdm

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('key.json')  # Replace with the path to your service account credentials JSON file
firebase_admin.initialize_app(cred)

# Get a reference to the Firestore client
db = firestore.client()

# Specify the collection name
collection_name = "ppl_locations"

# Retrieve all documents from the collection
docs = db.collection(collection_name).get()

for doc in tqdm(docs, total=len(docs)):
    # Get the current data of the document
    doc_data = doc.to_dict()

    # Add a new field to the document
    doc_data["price"] = np.random.randint(50, 200)

    # Update the document in Firestore
    doc.reference.update(doc_data)