import { Request, Response } from 'express';
import { Expenses } from '../models/expenseModel';
import { where } from 'sequelize';

// <------------------ Add an expense ------------------------->
export const addExpense = async (req: Request, res: Response) => {
    try {
        const { expenseTitle, amount, category } = req.body;
        const userId = (req as any).user.userId;
        const existingExpense = await Expenses.findOne({ where: { userId } });
        if (existingExpense) {
            if (existingExpense.expenseTitle == expenseTitle) {
                return res.status(400).json({
                    "error":"Expense Already exists !"
                })
            }
        }
        const expense = await Expenses.create({
            expenseTitle,
            amount,
            category,
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
// <------------------ See all expenses of a user  ------------------------->
export const getExpenses = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        if (!userId) return res.status(404).json({ error: "Unauthorized access, failed to verify user." });

        const expenses = await Expenses.findAll({ where: { userId } });

        if (!expenses) return res.status(404).json({
            error: "No expenses found into your account."
        });
        res.status(200).json({
            success: true,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error while fetching your expenses :( "
        });
    }
}
export const editExpenses = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const expenseId: any = req.params.expenseId;
        const { expenseTitle, amount, category } = req.body;

        if (!userId) return res.status(403).json({ error: "Unauthorized access" });
        const expense = await Expenses.findOne({ where: { expenseId, userId } });
        if (!expense) {
            return res.status(404).json({
                success: false,
                error: "Expense not found or unauthorized access "
            });
        }
        await Expenses.update({ expenseTitle, amount, category }, { where: { expenseId } })
        const updatedExpense = await Expenses.findByPk(expenseId);
        res.status(200).json({
            success: true,
            message: "Expense Updated successfully.",
            data: updatedExpense
        });
    } catch (err) {
        console.log("Error while updating the expense : ===> ", err);
        res.status(500).json({
            success: false,
            error: "Error while updating the expense. :( "
        });
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const expenseId: any = req.params.expenseId;
        const userId = (req as any).user.userId;

        if (!userId) return res.status(403).json({ "error": "Unauthorized access or session expired" })
        const expense = await Expenses.findOne({ where: { expenseId, userId } });
        if (!expense) return res.status(404).json({ 'error': "No associated expense found" });
        await expense.destroy();

        return res.status(200).json({ message: "Expense deleted successfully, you may need to refresh to see changes !" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Erro while deleting the expense." });
    }
}
