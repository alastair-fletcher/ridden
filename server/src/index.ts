import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { router } from './routes/router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan('tiny'));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
