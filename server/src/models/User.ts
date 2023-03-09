import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userId: { type: String, required: true },
  bikeIds: [String]
});

export const User = mongoose.model('User', UserSchema);