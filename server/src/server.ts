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

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});