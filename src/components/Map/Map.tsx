/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../../contexts/CitiesContext.tsx";
import { LeafletMouseEvent } from "leaflet";
import { useGeolocation } from "../../hooks/useGeolocation.ts";
import Button from "../Button/Button.tsx";
import useUrlPosition from "../../hooks/useUrlPosition.ts";

export default function Map() {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPos,
    position: geoLocationPos,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();
  console.log(lat, lng);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPos)
      setMapPosition([geoLocationPos.lat, geoLocationPos.lng]);
  }, [geoLocationPos]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPos && (
        <Button type="position" onClick={() => getPosition()}>
          {isLoadingPos ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        //@ts-ignore
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          // @ts-ignore
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <CenterMap position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function CenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}
