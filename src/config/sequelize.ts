import { Sequelize } from "sequelize-typescript";
import { User } from '../models/userModel';
import * as pg from 'pg';
import { Expenses } from "../models/expenseModel";
require('dotenv').config();
import * as fs from 'fs';
import * as path from 'path';

// for dev
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
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
        require: true, // Ensure SSL is required
        rejectUnauthorized: false, // Enforce certificate validation
        ca: fs.readFileSync('./ca.pem').toString(), // Path to the CA certificate
      },
    },
    models: [User, Expenses],
    logging: console.log,
  });
User.hasMany(Expenses, { foreignKey: 'userId' });
Expenses.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;

