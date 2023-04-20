import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import facebookLogo from '../../assets/facebookLogo.png';
import googleLogo from '../../assets/googleLogo.png';
import { ILoginSignUpProps } from '../../interfaces/interfaces';
import { addUser } from '../../API/API';
import styles from '../UserAuth/UserAuth.module.css';

export function Login({
  setHasAccount,
  loading,
  setLoading,
  setError,
  toggleModal,
}: ILoginSignUpProps) {
  const { login, googleLogin, modal, setModal } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toggleHasAccount = () => setHasAccount(false);

  // LOG IN WITH EMAIL / PASSWORD
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      // doesn't call "addUser" (in API), so won't log user to console on backend
      await login(
        emailRef.current?.value ?? '',
        passwordRef.current?.value ?? ''
      );
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
    setModal(false);
  }

  // LOG IN WITH GOOGLE + ADD USER TO DB (IF NOT ALREADY IN IT)
  async function handleGoogleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      // calls "addUser" (in API), so logs user to console on backend whether user exists already or not (see addUser in users.ts on server)
      await googleLogin().then(result =>
        addUser(result.user.uid, result.user.email)
      );
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
    setModal(false);
  }

  return (
    <Modal show={modal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
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
            onClick={handleGoogleSubmit}>
            <img src={googleLogo} alt="Google logo" width="28px" />
            <span>Continue with Google</span>
          </Button>
          <Button
            // onClick={signInWithFacebook}
            variant="secondary"
            className={`w-100 ${styles.socialBtn}`}>
            <img src={facebookLogo} alt="Facebook logo" width="28px" />
            <span>Continue with Facebook</span>
          </Button>
          <Button
            onClick={toggleHasAccount}
            className={`w-100 ${styles.socialBtn}`}>
            <p>New here? Create account</p>
          </Button>
        </Form>
        <div className="w-100 text-center mt-4">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
