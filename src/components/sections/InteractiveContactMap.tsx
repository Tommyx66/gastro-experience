"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface InteractiveContactMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const markerIcon = L.divIcon({
  className:
    "gastro-map-marker",
  html: `
    <div class="gastro-map-marker__pin">
      <div class="gastro-map-marker__inner"></div>
    </div>
  `,
  iconSize: [44, 52],
  iconAnchor: [22, 52],
  popupAnchor: [0, -48],
});

export default function InteractiveContactMap({
  lat,
  lng,
  zoom = 16,
}: InteractiveContactMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker
        position={[lat, lng]}
        icon={markerIcon}
      />

      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}