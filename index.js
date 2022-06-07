import express  from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
console.log("connected to mongodb")
  } catch (error) {
    throw (error)
  }
};

mongoose.connection.on("disconnect",() => {
  console.log('mongodb disconnect')
})


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


app.use((err,req, res, next) => {
  // console.log('hello in middleware')
  // next()
  const errorStatus = err.status || 500
  const errorMessage = err.message || "something wrong"

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})
// mongoose.connection.on("connected",() => {
//   console.log('mongodb connected')
// })

// app.get('/users', (req, res) => {
//   res.send('hello first message')
// })

app.listen(8800, () => {
  connect()
  console.log("dsdfgh")
})