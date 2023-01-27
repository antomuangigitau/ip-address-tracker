import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import styles from './Main.module.css';

const Main = () => {
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  tileRef.current = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  const mapParams = {
    center: [-1.066495, 37.05213],
    zoom: 13,
    zoomControl: false,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    layers: [tileRef.current],
  };
  // Define the styles that are to be passed to the map instance:
  const mapStyles = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };
  useEffect(() => {
    var container = L.DomUtil.get('map');

    if (container != null) {
      container._leaflet_id = null;
    }
    mapRef.current = L.map('map', mapParams);
  });

  return (
    <main className={styles.main}>
      <div id="map" style={mapStyles}></div>
    </main>
  );
};

export default Main;
