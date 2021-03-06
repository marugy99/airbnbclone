import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ locations, latAvg, lngAvg }) => {
  return (
    <MapContainer
      center={[latAvg, lngAvg]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker position={location.coordinates} key={index}>
          <Popup>{location.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
