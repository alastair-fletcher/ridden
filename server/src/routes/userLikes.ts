import express from 'express';
import { addLike } from '../controllers/userLikes'
// import { getAllLikes, addLike, removeLike } from '../controllers/userLikes'

export const userLikes = express.Router();

userLikes.route('/').post(addLike);
// bikes.get('/:model', getSingleBike);