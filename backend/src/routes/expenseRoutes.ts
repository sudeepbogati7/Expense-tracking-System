import { addExpense } from "../controllers/expenseController";
import express from 'express';
import { validateToken } from "../utils/validateToken";
const router = express.Router();

router.post('/add', validateToken,addExpense);

export default router