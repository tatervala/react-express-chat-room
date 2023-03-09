import styles from './styles.module.css'
import { useState, useEffect, useRef } from 'react'

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([])

    const messagesRef = useRef(null)

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

    useEffect(() => {
      
      socket.on('display_from_db', (displaymessages) => {
      console.log(displaymessages)
    //   displaymessages.currentTime.forEach(function(message){
    //     console.log(message)
    // })
      // displaymessages = sortByDate(displaymessages)
      setMessages((state) => [...displaymessages, ...state])
      })
  
      return () => socket.off('display_from_db')
    }, [socket])
  
    // function sortByDate(messages) {
    //   return messages.sort(
    //     (a, b) => parseInt(a.currentTime) - parseInt(b.currentTime)
    //   );
    // }

    const formatTime = (time) => {
        const date = new Date(time)
        return date.toLocaleString()
    }
    return (
        <div className={styles.messages} ref={messagesRef}>
        {messages.map((msg, i) => (
          <div className={styles.message} key={i}>
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