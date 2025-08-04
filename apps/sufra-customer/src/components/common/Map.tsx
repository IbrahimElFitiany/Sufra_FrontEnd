import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

type MapProps = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
};

function Map({ latitude = 30.0444, longitude = 31.2357, zoom = 12 }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (!mapContainerRef.current) return;

  const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [longitude, latitude],
      zoom,
  });

  new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

  return () => map.remove();
  },[latitude, longitude, zoom]);

  return (
    <div className="w-full h-79 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

export default Map;
