import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Location } from '@/types/Location';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
  location: Location;
  setLocation: (loc:Location) => void;
}

function LocationPickerMap ({location, setLocation }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.lng, location.lat],
      zoom: 9,
    });

    mapRef.current = map;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      marker: false,
    });

    map.on('load', () => {
      map.addControl(geocoder as any, 'top');
    });

    geocoder.on('result', (e) => {
      const coords = e.result.center;
      if (!coords) return;
      const [lng, lat] = coords;
      setLocation({ lat, lng });
      placeMarker({ lat, lng });
      map.flyTo({ center:[lng, lat],speed: 3, zoom: 12 });
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setLocation({ lat, lng });
      placeMarker({ lat, lng });
    });

    const placeMarker = ({ lat, lng }:Location) => {
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } 
      else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }
    };

    placeMarker(location);

    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ position: 'relative', zIndex: 0 }}
      />
    </div>
  );
}

export default LocationPickerMap;