import { Carousel } from 'react-bootstrap';
import { BikeList } from '../../components/BikeList/BikeList';
import { IHomeProps } from '../../interfaces/interfaces';
import styles from './Home.module.css';

export function Home({ searchQuery }: IHomeProps) {
  return (
    <>
      <div className={styles.hero}>
        <img
          className="w-100"
          alt="hero"
          src="./images/andhika-soreng-US06QF_sxu8-unsplash (1).jpg"
        />
        <p>Pre-loved bikes to take you on new adventures...</p>
      </div>
      <div className={styles['carousel-container']}>
        <Carousel controls={false} indicators={false} pause={false}>
          <Carousel.Item>
            <div className={styles['brands-container']}>
              <img src="./images/cannondaleLogo.png" alt="Cannondale" />
              <img src="./images/canyonLogo.png" alt="Canyon" />
              <img src="./images/cubeLogo.png" alt="Cube" />
              <img src="./images/giantLogo.png" alt="Giant" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles['brands-container']}>
              <img src="./images/gtLogo.png" alt="GT" />
              <img src="./images/konaLogo.png" alt="Kona" />
              <img src="./images/orbeaLogo.png" alt="Orbea" />
              <img src="./images/santaCruzLogo.png" alt="Santa Cruz" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles['brands-container']}>
              <img src="./images/scottLogo.png" alt="Scott" />
              <img src="./images/specializedLogo.png" alt="Specialized" />
              <img src="./images/trekLogo.png" alt="Trek" />
              <img src="./images/yetiLogo.png" alt="Yeti" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <BikeList searchQuery={searchQuery} />
    </>
  );
}
