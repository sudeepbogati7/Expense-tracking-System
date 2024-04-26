import { Sequelize } from "sequelize-typescript";
import { User } from '../models/userModel';
import * as pg from 'pg';
import { Expenses } from "../models/expenseModel";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sudeep',
    database: 'expense-tracker',
    models: [User, Expenses],
    logging: console.log,
    dialectModule: pg,
});

User.hasMany(Expenses, { foreignKey: 'userId' });
Expenses.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;

