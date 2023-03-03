import { useRef, useEffect, useState } from 'react';
// TODO eslint-disable-line import/no-webpack-loader-syntax -- should it not be !mapbox-gl -- see MapBox GL getting started docs
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { IMapProps } from '../../interfaces/interfaces';
import styles from './Map.module.css';

export function Map({ setAddedBike }: IMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(12);

  // RENDER THE MAP
  useEffect(() => {
    // ========= Check that map isn't already initalised
    if (map.current) return;
    // ========= Get the user's current location
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: false,
    });
    function successLocation(position: GeolocationPosition) {
      map.current = new mapboxgl.Map({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        attributionControl: false,
        center: [position.coords.longitude, position.coords.latitude],
        zoom: zoom,
      });
      // ========= initialise added bike state with current location
      setAddedBike((prevInfo) => ({
        ...prevInfo,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }));
      // ========= Add a marker at the user's current location
      const marker = new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map.current);

      // ========= ADD GEOLOCATE BUTTON
      const geoLocate = new mapboxgl.GeolocateControl({
        showUserLocation: true,
      });
      map?.current?.addControl(geoLocate, 'top-right');
      // ========= ADD GEOCODER INPUT
      const geoCoder = new MapboxGeocoder({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        mapboxgl: mapboxgl,
      });
      map?.current?.addControl(geoCoder, 'top-left');
      geoCoder.on('result', (result) => {
        console.log(result.result);
        console.log(result.result.place_name);
        setAddedBike((prevInfo) => ({
          ...prevInfo,
          longitude: result.result.center[0],
          latitude: result.result.center[1],
          placeName: result.result.place_name,
        }));
      });
    }
    function errorLocation() {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9,
      });
    }
  }, []);

  // ========= CHANGE LAT LNG WHEN MAP LOCATION MOVES
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     //TODO - toFixed() returns a string - change to return number????
  //     setZoom(map?.current?.getZoom().toFixed(2));
  //   });
  // }, [lat, lng]);

  return <div ref={mapContainer} className={styles.mapContainer}></div>;
}
