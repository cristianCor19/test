import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./V1/routes/user.routes.js";
import authRoutes from "./V1/routes/auth.routes.js";
import { connectDatabase } from './database/connect_db.js';

const app = express();

const corsOptions = {
  origin: '',
  credentials: true
}

app.use(cors(corsOptions));
//Call the environment variables
dotenv.config();

app.set('port', process.env.PORT)
app.use(express.json());

connectDatabase();

app.use('/user', userRoutes)
app.use('/auth', authRoutes)


//Start the server

app.listen(app.get('port'), () => {
  console.log(`server listening to port : ${app.get('port')}`);
})

