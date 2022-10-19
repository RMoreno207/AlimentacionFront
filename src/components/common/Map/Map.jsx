import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const Map = (props) => {
  // convertir longitud y latitud
  const long1 = props.longitude.toString().substring(0, 2);
  const long2 = props.longitude.toString().substring(2, 15);
  const long3 = long2.replace(/\./g, '');
  const dot = ".";
  const long = long1 + dot + long3;

  const lat1 = props.latitude.toString().substring(0, 2);
  const lat2 = props.latitude.toString().substring(2, 15);
  const lat3 = lat2.replace(/\./g, '');
  const lat = lat1 + dot + lat3;

  var icon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2049/2049726.png',
    iconSize: [30, 30],
    iconAnchor: null
  });
  const map = { "width": "100%", "height": "50vh" };


  return <div>
    <MapContainer style={map} center={[lat, long]} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        // Meter posicion obtenida por props
        position={[lat, long]}
        icon={icon}>
        <Popup>
          <h1>{props.name}</h1>
        </Popup>
      </Marker>

    </MapContainer>
  </div>;
};

export default Map;
