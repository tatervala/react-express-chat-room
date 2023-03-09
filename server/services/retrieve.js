import mongoose from "mongoose";
import axios from "axios";
import messageSchema from "./model.js";

function getMessages() {
    const password = 'w1QnK6HBnqoEaDFY'
    const dburl = `mongodb+srv://test:${password}@cluster0.aeigqo4.mongodb.net/?retryWrites=true&w=majority`
    if (!dburl) return null
    mongoose.connect(dburl)
    let Message = mongoose.model('Message', messageSchema)
    
    return Message.find({})

}
export default getMessages