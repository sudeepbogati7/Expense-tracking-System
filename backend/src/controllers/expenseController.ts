import { Request, Response } from 'express';
import { Expenses } from '../models/expenseModel';

export const addExpense =  async(req: any, res: Response) => {
    try {
        const { expenseTitle, amount } = req.body;
        const userId = req.user.userId;
        
        const expense = await Expenses.create({
            expenseTitle,
            amount,
            userId
        });
        res.status(201).json({
            "success": true,
            message: "Expense added.",
            data: expense
        });    
    }
    catch (err) {
        res.status(500).json({ error: "Error while adding an expense" });
        console.log(err);
    }
}