import { Sequelize } from "sequelize-typescript";
import { User } from '../models/user';
import * as pg from 'pg';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sudeep',
    database: 'expense-tracker',
    models: [User],
    logging: console.log,
    dialectModule: pg,
});

export default sequelize;

