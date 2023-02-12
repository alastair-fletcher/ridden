import { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import styles from './Login.module.css';
import googleLogo from '../../assets/googleLogo.png';
import facebookLogo from '../../assets/facebookLogo.png';
import { NavProps } from '../NavBar/Navbar';

export function Login({ showModal, setShowModal }: NavProps) {
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [hasAccount, setHasAccount] = useState(true);

  const handleLogIn = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const handleCreateNewAccount = () => {
    console.log('hello');
    setShowModal((prev) => !prev);
  };

  const handleChange = (e) => {
    setLoginDetails((prevLoginDetails) => {
      return {
        ...prevLoginDetails,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <Button onClick={handleLogIn}>Log In</Button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign in...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  S
                </Button>
              </InputGroup>
            </Form.Group>
            <Button
              // onClick={signInEmailPassword}
              variant="primary"
              type="submit"
              className="w-100"
            >
              Submit
            </Button>
          </Form>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <hr style={{ width: '42%' }}></hr>
            <span>or</span>
            <hr style={{ width: '42%' }}></hr>
          </div>
          <Button
            // onClick={signInWithGoogle}
            variant="light"
            className={`w-100 ${styles.socialBtn}`}
          >
            <img src={googleLogo} alt="Google logo" width="28px" />
            <span>Continue with Google</span>
          </Button>
          {/* // TODO: set up signInWithFaceook */}
          <Button
            // onClick={signInWithFacebook}
            variant="secondary"
            className={`w-100 ${styles.socialBtn}`}
          >
            <img src={facebookLogo} alt="Facebook logo" width="28px" />
            <span>Continue with Facebook</span>
          </Button>
          <Button as="a" onClick={handleCreateNewAccount}>
            <p>New here? Create account</p>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
