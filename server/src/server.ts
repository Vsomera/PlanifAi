import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "../config/database"

dotenv.config();
connectDB()


const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())

// User Routes
// Plans Routes
// Itinerary Routes

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});