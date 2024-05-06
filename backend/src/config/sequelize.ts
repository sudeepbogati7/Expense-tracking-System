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
if (!process.env.DB_URL) {
  throw new Error('Missing environment variable: DB_URL');
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV !== 'production' ? false : true, // Set to true for production
    },
  },
  models: [User, Expenses],
});


User.hasMany(Expenses, { foreignKey: 'userId' });
Expenses.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;

