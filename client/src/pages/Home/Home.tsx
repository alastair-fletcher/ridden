import { Carousel } from 'react-bootstrap';
import { RecentlyAddedBikes } from '../../components/RecentlyAddedBikes/RecentlyAddedBikes';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className="d-flex flex-column site-container">
      <main>
        <div className={styles['hero']}>
          <img
            className="w-100"
            alt="hero"
            src="./images/bikeImages/andhika-soreng-US06QF_sxu8-unsplash (1).jpg"
          />
          <p>Pre-loved bikes to take you on new adventures...</p>
        </div>
        <div className={styles['carousel-container']}>
          <Carousel controls={false} indicators={false} pause={false}>
            <Carousel.Item>
              <div className={styles['brands-container']}>
                <img
                  src="./images/brandLogos/cannondaleLogo.png"
                  alt="Cannondale"
                />
                <img src="./images/brandLogos/canyonLogo.png" alt="Canyon" />
                <img src="./images/brandLogos/cubeLogo.png" alt="Cube" />
                <img src="./images/brandLogos/giantLogo.png" alt="Giant" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className={styles['brands-container']}>
                <img src="./images/brandLogos/gtLogo.png" alt="GT" />
                <img src="./images/brandLogos/konaLogo.png" alt="Kona" />
                <img src="./images/brandLogos/orbeaLogo.png" alt="Orbea" />
                <img
                  src="./images/brandLogos/santaCruzLogo.png"
                  alt="Santa Cruz"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className={styles['brands-container']}>
                <img src="./images/brandLogos/scottLogo.png" alt="Scott" />
                <img
                  src="./images/brandLogos/specializedLogo.png"
                  alt="First slide"
                />
                <img src="./images/brandLogos/trekLogo.png" alt="Trek" />
                <img src="./images/brandLogos/yetiLogo.png" alt="Yeti" />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <RecentlyAddedBikes />
      </main>
    </div>
  );
}
