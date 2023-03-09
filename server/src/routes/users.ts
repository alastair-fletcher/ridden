import express from 'express';
import { addUser, getAllUsers, getSingleUser, toggleLike } from '../controllers/users'

export const users = express.Router();

users.route('/').get(getAllUsers).post(addUser);
users.route('/:userId').get(getSingleUser).patch(toggleLike);
