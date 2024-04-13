import { Sequelize } from "sequelize-typescript";

import pg from 'pg';
import User from "./models/user";

const sequelize = new Sequelize({
    username: 'postgres',
    password: 'sudeep',
    database: 'expense-tracker',
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
    dialectModule: pg
})
async function synchronizeModels() {
    try {
        await User.sync({ force: true }); // Sync the User model
        console.log('User table created successfully.');
        // Add sync calls for other models if you have them
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

// Call the function to sync the models
synchronizeModels();
export default sequelize;
