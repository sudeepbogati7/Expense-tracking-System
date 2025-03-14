import sequelize from "../src/config/sequelize";
import Express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from "../src/routes/userRoutes";
import expenseRoutes from '../src/routes/expenseRoutes';
import path from 'path';

const app = Express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(Express.json());

const allowedOrigins = [
  '*',
  'http://0.0.0.0:3000',
  'http://192.168.31.56:3000',
  'http://127.0.0.1:3000',
  'http://192.168.1.14:3000',
  'http://192.168.1.15:3000',
  'http://localhost:3000',
  'https://expense-tracker-2u19v0qvk-sudeepbogati7s-projects.vercel.app',
  'https://expense-tracker-neon-one.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

require('../src/utils/handleErrors')();
require('../src/utils/envVariables')();

app.use('/api/user', router);
app.use('/api/expenses', expenseRoutes);

sequelize.sync()
  .then(() => {
    console.log("Synchronized successfully.");
  })
  .catch(err => {
    console.error("Failed to sync database: ", err);
  });

// Export the app for Vercel
export default app;
