import { useRef } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ILoginSignUpProps } from '../../interfaces/interfaces';
import { addUser } from '../../API/API';

export function SignUp({
  setHasAccount,
  loading,
  setLoading,
  error,
  setError,
  toggleModal,
}: ILoginSignUpProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup, modal, setModal } = useAuth();

  // SIGN UP NEW USER WITH EMAIL / PASSWORD + ADD USER TO DB
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      //TODO - check this
      setHasAccount(true);
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef?.current?.value, passwordRef?.current?.value).then(
        (result) => addUser(result.user.uid, result.user.email)
      );
    } catch {
      setHasAccount(true);
      setError('Failed to create an account');
    }
    setModal(false);
  }

  const handleBackToLogin = () => setHasAccount(true);

  return (
    <Modal show={modal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <span onClick={handleBackToLogin}>
              <strong>Log In</strong>
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
