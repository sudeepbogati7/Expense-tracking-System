import { addExpense , getExpenses, editExpenses,deleteExpense} from "../controllers/expenseController";
import express from 'express';
import { validateToken } from "../utils/validateToken";
import { validateExpenseInputs } from "../utils/validateUserInput";
const router = express.Router();

router.post('/add', validateToken,validateExpenseInputs,addExpense);
router.get('/my-expenses', validateToken, getExpenses)
router.put('/edit/:expenseId', validateToken, validateExpenseInputs, editExpenses)
router.delete('/delete/:expenseId',validateToken, deleteExpense)
export default router;