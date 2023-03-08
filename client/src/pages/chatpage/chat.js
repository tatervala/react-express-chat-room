import styles from './styles.module.css'
import { useState, useEffect } from 'react'

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    currentTime: data.currentTime
                },
              
            ]) 
        })
        return () => socket.off('receive_message')
    },[socket])
    console.log(messages)

    const formatTime = (time) => {
        const date = new Date(time)
        return date.toLocaleString()
    }
    return (
        <div className={styles.message}>
        {messages.map((msg, i) => (
          <div key={i}>
            <div className={styles.chatText}>
              <span className={styles.userName}>{msg.username}</span>
              <p className={styles.messageText}>{msg.message}</p>
              <span className={styles.date}>
                {formatTime(msg.currentTime)}
              </span>
            </div>
            <br />
          </div>
        ))}
      </div>
    
    )
}
export default Messages