import mongoose from 'mongoose';

const UserLikeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  userId: { type: String, required: true },
  bikeIds: {
    type: [String],
    default: undefined
  }
});

export const UserLike = mongoose.model('UserLike', UserLikeSchema);