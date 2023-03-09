import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String,
    username: String,
    room: String,
    currentTime: String
})
export default messageSchema