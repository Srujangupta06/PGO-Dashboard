import mongoose from "mongoose";

const customerReviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const customerReview =
  mongoose.models.customerReview ||
  mongoose.model("customerReview", customerReviewSchema);
