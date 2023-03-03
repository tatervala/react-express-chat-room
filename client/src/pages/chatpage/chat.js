import styles from './styles.module.css'
import { useState, useEffect } from 'react'

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessages((state) => [
                ...state,
                {
                    message: data.message,
                    user: data.user,
                    currentTime: data.currentTime
                },
              
            ]) 
        })
        return () => socket.off('receive_message')
    },[socket])
    console.log(messages)

    const formatTime = (time) => {
        const date = new Date(time)
        return date.toLocaleDateString()
    }
    return (
      <div className={styles.messagesColumn}>
      {messages.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatTime(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
      )
}
export default Messages