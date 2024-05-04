import { Sequelize } from "sequelize-typescript";
import { User } from '../models/userModel';
import * as pg from 'pg';
import { Expenses } from "../models/expenseModel";
require('dotenv').config();



// for dev
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'sudeep',
//     database: 'expense-tracker',
//     models: [User, Expenses],
//     logging: console.log,
//     dialectModule: pg,
// });
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'dpg-cor2lri0si5c739avro0-a',
    port: 5432,
    username: 'sudeep',
    password: 'qUgdlhJJOIOSR8wAAopF3ysYOTULjWhe',
    database: 'expense_tracking_system',
    models: [User, Expenses],
    dialectModule: pg,
    ssl:true
});

// const sequelize = new Sequelize({
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     models: [User, Expenses],
//     dialectModule: pg,
// });
User.hasMany(Expenses, { foreignKey: 'userId' });
Expenses.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;

