import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext.js';

export function Likes() {
  const { logout } = useAuth();
  const signUserOut = () => {
    logout().then(() => {
      window.location.pathname = './';
    });
  };

  return (
    <>
      <h1>Likes</h1>
      <Button onClick={signUserOut}>Logout</Button>
    </>
  );
}
