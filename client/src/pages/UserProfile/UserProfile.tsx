import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext.js';

export function UserProfile() {
  const { logout } = useAuth();
  const signUserOut = () => {
    logout().then(() => {
      window.location.pathname = './';
    });
  };

  return <Button onClick={signUserOut}>Logout</Button>;
}
