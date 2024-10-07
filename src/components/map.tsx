import React, { CSSProperties } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle: CSSProperties = {
  width: "100%",
  height: "100%", // Adjust the height as needed
  position: "absolute",
  borderWidth: "0px",
  inset: "0px",
};

const center = {
  lat: 40.748817, // Latitude of the Empire State Building
  lng: -73.985428, // Longitude of the Empire State Building
};

const Map: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
