import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { bikes } from './routes/bikes';
import { users } from './routes/users';
import { connectDB } from './db/connect';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/bikes', bikes);
app.use('/api/v1/users', users);

const port = process.env.PORT || 3030;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}
start()