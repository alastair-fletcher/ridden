import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { SignUp } from '../SignUp/SignUp';
import facebookLogo from '../../assets/facebookLogo.png';
import googleLogo from '../../assets/googleLogo.png';
import styles from './Login.module.css';

export function Login() {
  const [hasAccount, setHasAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, login, googleLogin, modal, setModal } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const toggleModal = () => setModal((prev) => !prev);

  const toggleHasAccount = () => setHasAccount(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
    setModal(false);
  }

  async function handleGoogleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await googleLogin();
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
    setModal(false);
  }

  return (
    <>
      <Button onClick={toggleModal}>Log In</Button>
      {hasAccount ? (
        <Modal show={modal} onHide={toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign in...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Log In
              </Button>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <hr style={{ width: '42%' }}></hr>
                <span>or</span>
                <hr style={{ width: '42%' }}></hr>
              </div>
              <Button
                variant="light"
                className={`w-100 ${styles.socialBtn}`}
                onClick={handleGoogleSubmit}
              >
                <img src={googleLogo} alt="Google logo" width="28px" />
                <span>Continue with Google</span>
              </Button>
              <Button
                // onClick={signInWithFacebook}
                variant="secondary"
                className={`w-100 ${styles.socialBtn}`}
              >
                <img src={facebookLogo} alt="Facebook logo" width="28px" />
                <span>Continue with Facebook</span>
              </Button>
              <Button onClick={toggleHasAccount}>
                <p>New here? Create account</p>
              </Button>
            </Form>
            <div className="w-100 text-center mt-4">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <SignUp
          setHasAccount={setHasAccount}
          setModal={setModal}
          toggleModal={toggleModal}
          modal={modal}
        />
      )}
    </>
  );
}
