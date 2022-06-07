import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
    title: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    
  }, { timestamps: true }


);

export default mongoose.model('Room', RoomSchema)