import { customerReview } from "../models/customerReviewModel.js";

export const createCustomerReview = async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    if (review.length > 140) {
      return res
        .status(400)
        .json({ message: "Review should be less than 140 characters" });
    }
    const newCustomerReview = new customerReview({
      name,
      rating,
      review,
    });
    await newCustomerReview.save();
    res.status(200).json({ message: "Thank You for your Review" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCustomerReviews = async (req, res) => {
  try {
    const customerReviews = await customerReview.find({});
    res.status(200).json(customerReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
