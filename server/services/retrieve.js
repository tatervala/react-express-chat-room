import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()
import messageSchema from "./model.js";

function getMessages() {
    const mongoUrl = process.env.url
    const dburl = mongoUrl
    if (!dburl) return null
    mongoose.connect(dburl)
    let Message = mongoose.model('Message', messageSchema)
    
    return Message.find({})

}
export default getMessages