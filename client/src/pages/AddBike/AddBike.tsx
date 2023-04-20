import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Map } from '../../components/Map/Map';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { IBikeType } from '../../interfaces/interfaces';
import { nanoid } from 'nanoid';

export function AddBike() {
  const { currentUser } = useAuth();
  const bikeDefault = {
    bikeId: nanoid(),
    createdAt: Date().toLocaleString(),
    userId: currentUser?.uid,
    title: '',
    description: '',
    price: '',
    image: '',
    longitude: 0,
    latitude: 0,
    placeName: '',
  };
  const [addedBike, setAddedBike] = useState<IBikeType>(bikeDefault);

  // ================================= TEXT
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddedBike(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // ================================= IMAGES
  //TODO - see how to upload multiple images
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    //TODO add nanoID or uuidd to file names
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Handle progress
        },
        error => {
          // Handle error
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setAddedBike(prevInfo => ({
              ...prevInfo,
              image: downloadURL,
            }));
          });
        }
      );
    }
  };

  // ================================= SUBMIT FORM
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/v1/bikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addedBike),
    });
    setAddedBike(bikeDefault);
  };

  return (
    <>
      <Form className="mt-5">
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="title">
              <Form.Label>What are you selling?</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Specialized Stumpjumper 2019"
                name="title"
                value={addedBike.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="price">
              <Form.Label>Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>€</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="e.g. €1995"
                  name="price"
                  value={addedBike.price}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={addedBike.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="photos">
          <Form.Label>Photos</Form.Label>
          <Form.Control
            type="file"
            placeholder="e.g. add images..."
            onChange={handleFileUpload}
            multiple
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="location">
          <Form.Label>Location</Form.Label>
          <Map setAddedBike={setAddedBike} />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100 mt-4"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}
