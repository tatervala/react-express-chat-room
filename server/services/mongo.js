import mongoose from "mongoose";
import messageSchema from "./model.js";
function saveMessage(message, username, room, currentTime) {
    let Message = mongoose.model('Message', messageSchema)

    const savedMessage = new Message({
        message: message,
        username: username,
        room: room,
        currentTime: currentTime
    })
    console.log(Message)
    savedMessage.save().then(result => {
        console.log('saved!')
      })

} 
export default saveMessage