import React from "react";
import { MapContainer, GeoJSON,TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
const CovidMap = ({ countries }) => {
  const mapStyle = {
    weight: 1,
    color: "black",
    fillOpacity: 0.5,
  };

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;
    layer.bindPopup(`${name} ${confirmedText}`);
  };

  return (
    <MapContainer style={{ height: "40vh" }} zoom={3} center={[60, 30]}>
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
};

export default CovidMap;
