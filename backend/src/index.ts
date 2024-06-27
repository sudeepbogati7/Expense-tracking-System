import sequelize from "./config/sequelize";
import Express from 'express';
import bodyParser from "body-parser";
const app = Express();
const PORT = process.env.PORT || 3001;
import cors from 'cors';
import cookieParser from 'cookie-parser';

// middlewares
app.use(bodyParser.json());
app.use(Express.json());


const allowedOrigins = [
    'https://expense-tracker-2u19v0qvk-sudeepbogati7s-projects.vercel.app',
    'https://expense-tracker-neon-one.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Check if the incoming origin is in the allowedOrigins array
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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


// error handling mechanisms 
require('./utils/handleErrors')();

// routes 
import router from "./routes/userRoutes";
app.use('/api/user', router);

import expenseRoutes from './routes/expenseRoutes'
app.use('/api/expenses', expenseRoutes);

require('./utils/envVariables')();



sequelize.sync()
    .then(() => {
        console.log("Synchronized successfull..............")
        app.listen(PORT, () => {
            console.log("Server is running on port %d", PORT);
        })
    })

    .catch(err => {
        console.log("Failed to sync to database : ", err);
    });