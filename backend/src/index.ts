import sequelize from "./config/sequelize";
import Express from 'express';
import bodyParser from "body-parser";
const app = Express();
const PORT = process.env.PORT || 3001;
import cors from 'cors';
// middlewares
app.use(bodyParser.json());
app.use(Express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
// error handling mechanisms 
require('./utils/handleErrors')();
// routes 
import router from "./routes/userRoutes";
app.use('/api/user', router);

require('./utils/envVariables')();
// database synchronization
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