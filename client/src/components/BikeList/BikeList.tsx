import { useState, useEffect } from 'react';
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import { useBikes } from '../../context/BikeContext';
import { Bike } from '../BikeCard/BikeCard';
import { nanoid } from 'nanoid';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';

export function BikeList({ searchQuery }: { searchQuery: string }) {
  const [usersLikedBikes, setUsersLikedBikes] = useState<string[]>([]);
  const { bikes, loading, error } = useBikes();
  const { currentUser } = useAuth();

  useEffect(() => {
    const initializeLikesFromDB = async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/users/${currentUser?.uid}/likedBikes`
      );
      const json = await res.json();
      setUsersLikedBikes(json);
    };
    initializeLikesFromDB();
  }, []);

  const useSocket = () => {
    useEffect(() => {
      const socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);
      socket.on('userChange', change => {
        setUsersLikedBikes(change.updateDescription.updatedFields.bikeIds);
      });
      return () => {
        socket.disconnect();
      };
    }, [setUsersLikedBikes]);
  };
  useSocket();

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {bikes
            .filter(bike =>
              bike.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(bike => (
              <Col xs={6} sm={6} md={4} lg={3} className="mb-4" key={nanoid()}>
                <Bike bike={bike} usersLikedBikes={usersLikedBikes} />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
}
