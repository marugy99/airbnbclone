import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ lat, long }) => {
  return (
    <MapContainer
      center={[lat, long]}
      zoom={20}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>Property location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
