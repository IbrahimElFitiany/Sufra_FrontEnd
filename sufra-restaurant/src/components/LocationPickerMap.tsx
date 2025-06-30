// components/LocationPickerMap.tsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

// Type declarations for leaflet-geosearch
declare module 'leaflet-geosearch' {
  interface OpenStreetMapProviderParams {
    viewbox?: string;
    bounded?: number;
  }

  interface OpenStreetMapProvider {
    constructor(options?: { params?: OpenStreetMapProviderParams }): OpenStreetMapProvider;
  }

  interface GeoSearchControlOptions {
    provider: any;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    autoClose?: boolean;
    retainZoomLevel?: boolean;
    animateZoom?: boolean;
    keepResult?: boolean;
  }

  class GeoSearchControl extends L.Control {
    constructor(options: GeoSearchControlOptions);
  }
}

interface Location {
  lat: number;
  lng: number;
}

interface MapClickHandlerProps {
  setLocation: (location: Location) => void;
}

interface SearchControlProps {
  setLocation: (location: Location) => void;
}

interface LocationPickerMapProps {
  location: Location;
  setLocation: (location: Location) => void;
}

function MapClickHandler({ setLocation }: MapClickHandlerProps) {
  useMapEvents({
    click(event: L.LeafletMouseEvent) {
      const { lat, lng } = event.latlng;
      setLocation({ lat, lng });
    },
  });
  return null;
}

function SearchControl({ setLocation }: SearchControlProps) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        viewbox: '24.696,31.667,36.866,21.999',
        bounded: 4
      }
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    interface GeoSearchResultEvent extends L.LeafletEvent {
      location: {
        y: number;
        x: number;
        label: string;
        bounds: L.LatLngBounds;
      };
    }

    const handleSearchResult = (event: GeoSearchResultEvent) => {
      const lat = event.location.y;
      const lng = event.location.x;
      setLocation({ lat, lng });
      map.setView([lat, lng], 15);
    };

    map.on('geosearch/showlocation', handleSearchResult as L.LeafletEventHandlerFn);

    return () => {
      map.off('geosearch/showlocation', handleSearchResult as L.LeafletEventHandlerFn);
      map.removeControl(searchControl);
    };
  }, [map, setLocation]);

  return null;
}

const LocationPickerMap = ({ location, setLocation }: LocationPickerMapProps) => {
  return (
    <MapContainer 
      center={location} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }} 
      maxBounds={[[21.999, 24.696], [31.667, 36.866]]} 
      maxBoundsViscosity={1.0}
    >      
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <SearchControl setLocation={setLocation} />
      <MapClickHandler setLocation={setLocation} />
      <Marker position={location}>
        <Popup>
          Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPickerMap;