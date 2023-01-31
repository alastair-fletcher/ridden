// import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container } from 'react-bootstrap';
import styles from './Navbar.module.css';
// import { useBikes } from '../contexts/BikesContext';
// import { Login } from './Login';
// import { Search } from './Search';

export function Nav() {
  // const { isAuth, setIsAuth } = useBikes();

  // const handleClick = (e) => {
  //   console.log('clicked');
  // };

  return (
    <Navbar bg="dark" variant="dark" className={styles.navbar}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className={styles.brandtitle}>Ridden</Navbar.Brand>
        </LinkContainer>
        {/* <Search search={search} setSearch={setSearch} />
        {!isAuth ? (
          <Login
            setIsAuth={setIsAuth}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        ) : (
          <div className={styles.userInfo}>
            <p style={{ color: 'white', fontWeight: 600 }}>
              {auth.currentUser.displayName.split(' ')[0]}
            </p>
            <LinkContainer to="/add-bike">
              <FontAwesomeIcon
                icon={faCirclePlus}
                size="lg"
                className={styles.fontAwesome}
                onClick={handleClick}
              />
            </LinkContainer>
            <FontAwesomeIcon
              icon={faBasketShopping}
              size="lg"
              className={styles.fontAwesome}
              onClick={handleClick}
            />
            <LinkContainer to="/profile">
              <img
                className={`image-large ${styles.profilePic}`}
                src={auth.currentUser.photoURL}
                alt={auth.currentUser.displayName}
                title={auth.currentUser.displayName}
              />
            </LinkContainer>
          </div>
        )} */}
      </Container>
    </Navbar>
  );
}
