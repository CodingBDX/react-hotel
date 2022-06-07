import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const RoomId = req.params.Roomid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save()
    try {
      await Room.findByIdAndUpdate(RoomId, {$push : {rooms: savedRoom._id}})

    }catch(err){next(err)}
    res.status(200).json(savedRoom)
   }
  catch (err) {
    next(err)
  }
}


export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = new Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

    res.status(200).json(updatedRoom);

  } catch (err) {
    next(err)
  }
}

export const deleteRoom = async (req, res, next) => {
  const RoomId = req.params.Roomid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }
      });
      
    } catch (err) { next(err) }
    res.status(200).json("room has been deleted")
;
  } catch (err) { next(err) }
}



export const getRoom = async (req, res, next) => {
  try {
    const room = new Room.findById(req.params.id)

    res.status(200).json(room);

  } catch (err) {

    next(err)
  }
}

export const getRooms = async (req, res, next) => {
  try {
    const rooms = new Room.find()

    res.status(200).json(rooms);
  } catch (err) {
    next(err)
  }
}
