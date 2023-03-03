import mongoose from 'mongoose';

const BikeSchema = new mongoose.Schema({
  bikeId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  userId: { type: String, required: true },
  title: {
    type: String,
    required: [true, 'must provide title'],
  },
  description: {
    type: String,
    required: [true, 'must provide description'],
  },
  price: {
    type: String,
    required: [true, 'must provide price'],
  },
  image: {
    type: String,
    required: [true, 'must upload image'],
  },
  latitude: {
    type: String || Number,
    required: true,
  },
  longitude: {
    type: String || Number,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  }
});

export const Bike = mongoose.model('Bike', BikeSchema);