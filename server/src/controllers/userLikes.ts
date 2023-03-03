import { Request, Response } from "express";
import { UserLike } from "../models/UserLike";

// export const getAllLikes = async (req: Request, res: Response) => {
//   try {
//     res.send(await UserLike.find());
//     res.status(201);
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

export const addLike = async (req: Request, res: Response) => {
  try {
    const { bikeId, userId } = req.body;
    const likedBike = await UserLike.create({
      bikeId, userId
    });
    res.status(201);
    res.send(likedBike);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
}

// export const getUserBike = async (req: Request, res: Response) => {
//   const model = data.bikes.find((bike) => bike.model === req.params.model);
//   if (model) {
//     res.send(model);
//   } else {
//     res.status(404).send({ message: 'not found' });
//   }
// };