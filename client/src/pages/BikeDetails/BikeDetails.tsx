import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import { IBikeType } from '../../interfaces/interfaces';
import styles from './BikeDetails.module.css';

export function BikeDetails() {
  const [bikeDetails, setBikeDetails] = useState<IBikeType>({
    bikeId: '',
    createdAt: '',
    userId: '',
    title: '',
    description: '',
    price: '',
    image: '',
    longitude: 0,
    latitude: 0,
    placeName: '',
  });
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const params = useParams();
  const { bikeId } = params;

  //
  // ========== get info from db for specific bike
  // 1st useEffect - to get bike details from DB then set "bikeDeets" state
  useEffect(() => {
    async function getAndSetBike() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/bikes/${bikeId}`
        );
        const bikeData = await response.json();
        setBikeDetails(bikeData);
      } catch (error) {
        console.log(error);
      }
    }
    getAndSetBike();
  }, []);

  //
  // ========== set map location of specific bike
  // 2nd useEffect - separate useEffect with bikeDeets as a dependency, so only runs and sets map after bikeDeets have been set.
  useEffect(() => {
    if (bikeDetails.latitude && bikeDetails.longitude) {
      map.current = new mapboxgl.Map({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        container: mapContainer.current ? mapContainer.current : '',
        style: 'mapbox://styles/mapbox/streets-v11',
        attributionControl: false,
        center: [bikeDetails.longitude, bikeDetails.latitude],
        zoom: 12,
      });
    }
  }, [bikeDetails]);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <img
            className="image-large"
            src={bikeDetails?.image}
            alt={bikeDetails?.title}
          />
          <h1>{bikeDetails?.placeName}</h1>
          <p>{bikeDetails?.price}</p>
          <p>{bikeDetails?.description}</p>
          <div ref={mapContainer} className={styles.mapContainer}></div>
        </Col>
      </Row>
    </Container>
  );
}
