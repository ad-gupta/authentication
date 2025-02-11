import express from "express";
import dotenv from "dotenv";
import error from "./middlewares/error.js";
import mongoose from "mongoose";
import path from 'path';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRoute from './routes/user.js'

const app = express();
dotenv.config();

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "infloso-auth" })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
};

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/api/v1", userRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use(error);
app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`server is running on port ${process.env.PORT}`);
});