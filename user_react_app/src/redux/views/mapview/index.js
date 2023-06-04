import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
  const parkingLots = useSelector(state => state.user.parkingLots );
  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[19.076, 72.8777]}>
        <Popup>
          Fare <b>INR. 90</b> <br />
          Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[19.054, 72.889]}>
        <Popup>
          Fare <b>INR. 110</b> <br /> Easily customizable.
        </Popup>
      </Marker>
      {parkingLots.map((pL,ind) => 
        <Marker position={[pL.location.lat, pL.location.lon]} key={ind}>
        <Popup>
          <h2>
            {pL.name}
            </h2>Fare <b>INR. {pL.price}</b> <br /> Easily customizable.
        </Popup>
      </Marker>
)}
    </MapContainer>
  );
};
export default MapView;
