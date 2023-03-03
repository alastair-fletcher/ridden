import express from 'express';
import { addBike, getAllBikes, getSingleBike } from '../controllers/bikes'

export const bikes = express.Router();

bikes.route('/').get(getAllBikes).post(addBike);
bikes.get('/:bikeId', getSingleBike);