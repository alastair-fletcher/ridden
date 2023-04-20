import { Request, Response } from "express";
import { Bike } from "../models/Bike";

// ======= using async wrapper fucntion from either Smigla or WebDevSimplified tutorial - the one with 'Tasks' mongoose model
// export const getAllBikes = asyncWrapper(async (req, res) => {
//   const tasks = await Task.find({});
//   res.status(200).json({ tasks });
// });

export const getAllBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await Bike.find()
    res.status(200).json(bikes)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBike = async (req: Request, res: Response) => {
  const bikeId = req.params.bikeId;
  try {
    const bike = await Bike.findOne({ bikeId: bikeId })
    if (!bike) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(bike)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addBike = async (req: Request, res: Response) => {
  const { bikeId, createdAt, userId, title, description, price, image, latitude, longitude, placeName } = req.body;
  try {
    const bikeToAdd = await Bike.create({
      bikeId, createdAt, userId, title, description, price, image, latitude, longitude, placeName
    });
    res.status(201).json(bikeToAdd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}