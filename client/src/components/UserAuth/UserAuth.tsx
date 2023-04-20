import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { SignUp } from './SignUp';
import { Login } from './Login';

export function UserAuth() {
  const [hasAccount, setHasAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setModal } = useAuth();

  const toggleModal = () => setModal(prev => !prev);

  return (
    <>
      <Button onClick={toggleModal}>Log In</Button>
      {hasAccount ? (
        <Login
          setHasAccount={setHasAccount}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          toggleModal={toggleModal}
        />
      ) : (
        <SignUp
          setHasAccount={setHasAccount}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
}
