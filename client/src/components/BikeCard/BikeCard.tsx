import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';
import { IconContext } from 'react-icons';
import { BiHeart } from 'react-icons/bi';
import { IBikeType } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import { toggleLike } from '../../API/API';
import styles from './BikeCard.module.css';

export function Bike({ bike }: { bike: IBikeType }) {
  const [heartColor, setHeartColor] = useState(false);
  const { currentUser, modal, setModal } = useAuth();

  function handleClick() {
    if (currentUser) {
      setHeartColor((prev) => !prev);
      if (!heartColor) {
        toggleLike(currentUser?.uid, bike.bikeId);
      } else {
        toggleLike(currentUser?.uid, bike.bikeId);
      }
    } else {
      setModal((prev) => !prev);
    }
  }

  return (
    <Card>
      <Link to={`bikes/${bike.bikeId}`}>
        <img
          src={bike.image}
          className={styles['card-img-top']}
          alt={bike.title}
        />
      </Link>
      <Card.Body>
        <div className={styles.topLine}>
          <span>€ {bike.price}</span>
          <IconContext.Provider
            value={{
              size: '1.6em',
            }}
          >
            <BiHeart
              className={`${styles.heart} ${heartColor && styles.heartOn}`}
              onClick={handleClick}
            />
          </IconContext.Provider>
        </div>
        <span>{bike.title}</span>
      </Card.Body>
    </Card>
  );
}
