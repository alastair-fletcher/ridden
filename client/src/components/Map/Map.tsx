import { useRef, useEffect } from 'react';
// TODO eslint-disable-line import/no-webpack-loader-syntax -- should it not be !mapbox-gl -- see MapBox GL getting started docs
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { IMapProps } from '../../interfaces/interfaces';
import styles from './Map.module.css';

export function Map({ setAddedBike }: IMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    //
    // ========= GET CURRENT LOCATION FROM GEOLOCATION API
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: false,
    });
    //
    // ========= SUCCESS HANDLER FOR getCurrentPosition
    function successLocation(position: GeolocationPosition) {
      //
      // RENDER MAP
      map.current = new mapboxgl.Map({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        attributionControl: false,
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 12,
      });
      //
      // ========= Add a marker at the user's current location
      // const marker = new mapboxgl.Marker()
      //   .setLngLat([position.coords.longitude, position.coords.latitude])
      //   .addTo(map.current);
      //
      // ========= ADD GEOLOCATE BUTTON
      const geoLocate = new mapboxgl.GeolocateControl({
        showUserLocation: true,
      });
      map?.current?.addControl(geoLocate, 'top-right');
      //
      // ========= ADD GEOCODER INPUT
      const geoCoder = new MapboxGeocoder({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        mapboxgl: mapboxgl,
        reverseGeocode: true,
      });
      map?.current?.addControl(geoCoder, 'top-left');
      geoCoder
        .query(`${position.coords.latitude}, ${position.coords.longitude}`)
        .on('result', (result) => {
          // ========= INITIALISE ADDED BIKE STATE WITH CURRENT LOCATION
          setAddedBike((prevInfo) => ({
            ...prevInfo,
            longitude: result.result.center[0],
            latitude: result.result.center[1],
            // DON'T GIVE EXACT ADDRESS FOR PLACE NAME
            placeName: result.result.place_name
              .split(',')
              .slice(1, -1)
              .join(',')
              .trim(),
          }));
          geoCoder.clear();
        });
    }
    // ========= ERROR HANDLER FOR getCurrentPosition
    function errorLocation() {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9,
      });
    }
  }, []);

  return <div ref={mapContainer} className={styles.mapContainer}></div>;
}
