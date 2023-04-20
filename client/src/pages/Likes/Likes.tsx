import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext.js';
import { useBikes } from '../../context/BikeContext.js';

const likeys = ['zK-rZ83YOkFXEAGje6sjk'];
export function Likes() {
  const [likedBikes, setLikedBikes] = useState([]);
  const { bikes } = useBikes();

  useEffect(() => {
    const yesyes = [];
    for (let i = 0; i < likeys.length; i++) {
      const yes = bikes.find(bike => bike.bikeId === likeys[i]);
      yesyes.push(yes);
    }
    setLikedBikes(yesyes);
    console.log(likedBikes);
  }, []);

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
