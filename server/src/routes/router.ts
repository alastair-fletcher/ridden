import express, { Request, Response } from 'express';
import { data } from '../data';

export const router = express.Router();

router.get('/api/bikes', (req: Request, res: Response) => {
  res.send(data.bikes);
});

router.get('/api/bikes/:model', (req: Request, res: Response) => {
  const model = data.bikes.find((bike) => bike.model === req.params.model);
  if (model) {
    res.send(model);
  } else {
    res.status(404).send({ message: 'not found' });
  }
});