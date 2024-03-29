import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
import dotenv from 'dotenv';
import { bikes } from './routes/bikes';
import { users } from './routes/users';
import { connectDB } from './db/connect';
import { createServer } from "http";
import { Server } from "socket.io";

import { User } from "./models/User";

dotenv.config();
const app = express();
const port = process.env.PORT || 3030;

//========= middleware
app.use(cors());
// app.use(morgan('tiny'));
app.use(express.json());

//========= routes
app.use('/api/v1/bikes', bikes);
app.use('/api/v1/users', users);

//========= sockets.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"]
  }
});

//========= connect socket
// io.on('connect', (socket) => {
//   console.log('A user has connected.');
//   socket.on('disconnect', () => {
//     console.log('A user has disconnected.');
//     console.log(socket.id)
//   });
// });

//========= mongoose change stream
const userChangeStream = User.watch();
userChangeStream.on('change', (change) => {
  io.emit('userChange', change);
});

//========= connect DB and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    httpServer.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}
start()