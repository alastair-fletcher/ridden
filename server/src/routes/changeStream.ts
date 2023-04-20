import express from 'express';
import { addBike, getAllBikes } from '../controllers/bikes'

export const changeStream = express.Router();

changeStream.route('/').get(getAllBikes).post(addBike);
