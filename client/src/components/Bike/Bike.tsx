import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/button';
import { Link } from 'react-router-dom';
import styles from './Bike.module.css';
import { BikeType } from '../../context/BikeContext';
import { FaHeart } from 'react-icons/fa';

export function Bike({ bike }: { bike: BikeType }) {
  return (
    <Card>
      <Link to={`bikes/${bike.model}`}>
        <img src={bike.image} className="card-img-top" alt={bike.model} />
      </Link>
      <Card.Body>
        <div className={styles.topLine}>
          <Card.Title>€{bike.price}</Card.Title>
          <FaHeart className={styles.heartOn} size="1em" />
        </div>
        <Card.Text>
          {bike.model} {bike.brand}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
