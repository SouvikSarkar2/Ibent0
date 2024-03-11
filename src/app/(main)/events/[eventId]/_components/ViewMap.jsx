"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

const ViewMap = ({ coordinates }) => {
  // console.log(coordinates);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "4xvvAyMfEq6xan1UKktB";

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [coordinates[0], coordinates[1]],
      zoom: zoom,
    });
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([coordinates[0], coordinates[1]])
      .addTo(map.current);
  }, [coordinates, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default ViewMap;
