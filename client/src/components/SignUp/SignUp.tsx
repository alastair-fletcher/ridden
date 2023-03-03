import { useRef, useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function SignUp({ setHasAccount, setModal, modal, toggleModal }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to create an account');
    }
    setModal(false);
  }

  const handleBackToLogin = () => setHasAccount(true);

  return (
    <Modal show={modal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create account...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">Passwords do not match</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Sign Up
          </Button>
          <div className="w-100 text-center mt-4">
            Already have an account?
            <span onClick={handleBackToLogin}>Log In</span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}