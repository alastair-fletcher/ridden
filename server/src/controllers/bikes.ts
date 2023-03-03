import { Request, Response } from "express";
import { Bike } from "../models/Bike";

// ======= using async wrapper fucntion from either Smigla or WebDevSimplified tutorial - the one with 'Tasks' mongoose model
// export const getAllBikes = asyncWrapper(async (req, res) => {
//   const tasks = await Task.find({});
//   res.status(200).json({ tasks });
// });

export const getAllBikes = async (req: Request, res: Response) => {
  try {
    res.send(await Bike.find());
    res.status(201);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const addBike = async (req: Request, res: Response) => {
  try {
    const { bikeId, createdAt, userId, title, description, price, image, latitude, longitude, placeName } = req.body;
    const bikeToAdd = await Bike.create({
      bikeId, createdAt, userId, title, description, price, image, latitude, longitude, placeName
    });
    res.status(201);
    res.send(bikeToAdd);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
}

export const getSingleBike = async (req: Request, res: Response) => {
  const bikeId = req.params.bikeId;
  try {
    const bike = await Bike.find({ bikeId: bikeId })
    res.send(bike[0])
  } catch (error) {
    res.status(404).send({ message: 'not found' });
  }
};
