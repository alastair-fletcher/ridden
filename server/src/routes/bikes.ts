import express from 'express';
import { getAllBikes, getBike, addBike } from '../controllers/bikes'

export const bikes = express.Router();

bikes.route('/').get(getAllBikes).post(addBike);
bikes.route('/:bikeId').get(getBike);