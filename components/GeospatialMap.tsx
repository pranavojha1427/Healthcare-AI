"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GeospatialMap() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, []);

  // Center around Maharashtra
  const position: [number, number] = [18.5204, 73.8567];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={9} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {locations.map((loc, idx) => (
          <CircleMarker 
            key={idx}
            center={[loc.lat, loc.lng]}
            radius={8}
            pathOptions={{ 
              fillColor: loc.status === "RED" ? "#ba1a1a" : loc.status === "YELLOW" ? "#b45309" : "#059669", 
              color: "#ffffff",
              weight: 1.5,
              fillOpacity: 0.8 
            }}
          >
            <Popup>
              <div className="font-sans">
                <div className="font-bold border-b pb-1 mb-1">{loc.facility_id}</div>
                <div className="text-sm">Critical Item: <span className="font-medium">{loc.critical_item}</span></div>
                <div className="text-sm">Days to Stockout: <span className={`font-bold ${loc.status === "RED" ? "text-red-600" : ""}`}>{loc.days_to_stockout}</span></div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
