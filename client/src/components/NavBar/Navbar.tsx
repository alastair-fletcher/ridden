import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Search } from '../Search/Search';
import { UserAuth } from '../UserAuth/UserAuth';
import { INavProps } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import { FaPlusCircle } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
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
          <UserAuth />
        ) : currentUser.emailVerified ? (
          //
          // ============================ Logged in with Google
          <div className={styles.userInfo}>
            <LinkContainer to="/add-bike">
              <FaPlusCircle className={styles['react-icons']} />
            </LinkContainer>
            <LinkContainer to="/likes">
              <FaRegHeart className={styles['react-icons']} />
            </LinkContainer>
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
          //
          // ============================ Logged in with email + password
          <div className={styles.userInfo}>
            <LinkContainer to="/add-bike">
              <FaPlusCircle className={styles['react-icons']} />
            </LinkContainer>
            <LinkContainer to="/likes">
              <FaRegHeart className={styles['react-icons']} />
            </LinkContainer>
            <LinkContainer to="/profile">
              <div className={`image-large ${styles.profilePic}`} />
            </LinkContainer>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
