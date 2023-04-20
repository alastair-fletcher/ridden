import express from 'express';
import { addUser, getAllUsers, getUser, toggleLike, getUsersLikedBikes } from '../controllers/users'

export const users = express.Router();

users.route('/').get(getAllUsers).post(addUser);
users.route('/:userId').get(getUser).patch(toggleLike);
users.route('/:userId/likedBikes').get(getUsersLikedBikes);
