import { Request, Response } from "express";
import { User } from "../models/User";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;
    await User.findOne({ userId: userId }).then(result => {
      !result ? User.create({ userId: userId, email: email }).then(result => console.log(result)).catch(error => console.log(error)) : console.log(result);
    })
    res.status(201);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' });
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    res.send(await User.find());
    res.status(200);
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: error });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    res.send(await User.findOne({ userId: userId }));
    res.status(200);
  } catch (error) {
    res.status(404).send({ message: 'not found' });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { bikeId } = req.body;
  try {
    // Find the user by `userId`
    const user = await User.findOne({ userId: userId });

    // If the user doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Get the 'likes' array and check if it already contains the bike
    const likesArray = user.bikeIds;
    const index = likesArray.indexOf(bikeId);

    // push bike to 'likes' array / remove bike from 'likes' array
    index === -1 ? likesArray.push(bikeId) : likesArray.splice(index, 1);

    // Update the document with the new array property
    const updatedDoc = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { bikeIds: likesArray } },
      { new: true }
    );
    // Return the updated document
    res.send(updatedDoc);
  } catch (err) {
    console.log(err);
  }
}