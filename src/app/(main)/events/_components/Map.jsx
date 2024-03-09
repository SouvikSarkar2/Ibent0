"use client";

import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import * as maptilerClient from "@maptiler/client";
import { useGeolocationStore } from "@/store";

maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(77.19046233320262);
  const [lat] = useState(28.5450205005);
  const [zoom] = useState(14);
  const [API_KEY] = useState("4xvvAyMfEq6xan1UKktB");
  const [mapController, setMapController] = useState();
  const { setCoordinates } = useGeolocationStore();

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    /* new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current); */
    setMapController(createMapLibreGlMapController(map.current, maplibregl));
  }, [API_KEY, lng, lat, zoom]);

  /* const func = async () => {
    // in an async function, or as a 'thenable':
    const result = await maptilerClient.geocoding.forward("iiit bhubaneswar");
    console.log(result);
  };

  func(); */

  async function handleSelect(e) {
    if (e?.center) {
      setCoordinates(e.center);
    }
  }

  return (
    <div className="map-wrap">
      <div className="geocoding">
        <GeocodingControl
          class="z-10"
          apiKey={API_KEY}
          mapController={mapController}
          onSelect={handleSelect}
        />
      </div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}
