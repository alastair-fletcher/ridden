import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Search } from '../Search/Search';
import { Login } from '../Login/Login';
import { INavProps } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import { FaPlusCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Navbar.module.css';

export function Nav({ setSearchQuery }: INavProps) {
  const { currentUser } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className={styles.navbar}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className={styles.brandtitle}>Ridden</Navbar.Brand>
        </LinkContainer>
        <Search setSearchQuery={setSearchQuery} />
        {!currentUser ? (
          <Login />
        ) : currentUser.emailVerified ? (
          <div className={styles.userInfo}>
            <p style={{ color: 'white', fontWeight: 600 }}>
              {currentUser.displayName.split(' ')[0]}
            </p>

            <LinkContainer to="/add-bike">
              <FaPlusCircle
                size="lg"
                className={styles['react-icons']}
                // onClick={handleClick}
              />
            </LinkContainer>
            <FaShoppingCart
              size="lg"
              className={styles['react-icons']}
              // onClick={handleClick}
            />
            <LinkContainer to="/profile">
              <img
                className={`image-large ${styles.profilePic}`}
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                title={currentUser.displayName}
              />
            </LinkContainer>
          </div>
        ) : (
          <LinkContainer to="/profile">
            <div className={`image-large ${styles.profilePic}`} />
          </LinkContainer>
        )}
      </Container>
    </Navbar>
  );
}
