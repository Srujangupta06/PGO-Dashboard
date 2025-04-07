import express from 'express';
import { addHostelInfo } from '../controllers/hostelController.js';

const router = express.Router();



router.post('/add-hostel-info',addHostelInfo);



export default router