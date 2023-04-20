import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';
import { IconContext } from 'react-icons';
import { BiHeart } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';
import { toggleLike } from '../../API/API';
import { IBikeCardProps } from '../../interfaces/interfaces';
import styles from './BikeCard.module.css';

export function Bike({ bike, usersLikedBikes }: IBikeCardProps) {
  const { currentUser, setModal } = useAuth();

  function handleClick() {
    if (currentUser) {
      toggleLike(currentUser?.uid, bike.bikeId);
    } else {
      setModal(prev => !prev);
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
            }}>
            <BiHeart
              className={`${styles.heart} ${
                usersLikedBikes.includes(bike.bikeId) && styles.heartOn
              }`}
              onClick={handleClick}
            />
          </IconContext.Provider>
        </div>
        <span>{bike.title}</span>
      </Card.Body>
    </Card>
  );
}
