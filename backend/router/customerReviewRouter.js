import express from "express";
import {
  createCustomerReview,
  getCustomerReviews,
} from "../controllers/customerReview.js";

const router = express.Router();

router.post("/add/customer-review", createCustomerReview);

router.get("/customer-reviews", getCustomerReviews);

export default router;