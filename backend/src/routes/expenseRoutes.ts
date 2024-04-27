import { addExpense , getExpenses, editExpenses} from "../controllers/expenseController";
import express from 'express';
import { validateToken } from "../utils/validateToken";
import { validateExpenseInputs } from "../utils/validateUserInput";
const router = express.Router();

router.post('/add', validateToken,validateExpenseInputs,addExpense);
router.get('/my-expenses', validateToken, getExpenses)
router.post('/edit/:expense-id',validateToken, editExpenses)
export default router;