import { Row, Col, Spinner } from 'react-bootstrap';
import { useBikes } from '../../context/BikeContext';
import { Bike } from '../BikeCard/BikeCard';
import { nanoid } from 'nanoid';
import { IBikeListProps } from '../../interfaces/interfaces';
import styles from './BikeList.module.css';

export function BikeList({ searchQuery }: IBikeListProps) {
  const { bikes, loading, error } = useBikes();

  return (
    <div className={styles.products}>
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {bikes
            .filter((bike) =>
              bike.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((bike) => (
              <Col xs={6} sm={6} md={4} lg={3} className="mb-4" key={nanoid()}>
                <Bike
                  bike={bike}
                  // showModal={showModal}
                  // setShowModal={setShowModal}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}
