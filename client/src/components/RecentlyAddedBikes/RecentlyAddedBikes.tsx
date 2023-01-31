import { useBikes } from '../../context/BikeContext';
import { nanoid } from 'nanoid';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Bike } from '../Bike/Bike';
import styles from './RecentlyAddedBikes.module.css';

export function RecentlyAddedBikes() {
  const { bikes, loading, error } = useBikes();

  return (
    <div className={styles['products']}>
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {bikes.map((bike) => (
            <Col xs={6} sm={6} md={4} lg={3} className="mb-4" key={nanoid()}>
              <Bike
                bike={bike}
                // setIsAuth={setIsAuth}
                // isAuth={isAuth}
                // showModal={showModal}
                // setShowModal={setShowModal}
                key={nanoid()}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
