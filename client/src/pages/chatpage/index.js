import styles from './styles.module.css'
import Messages from './chat'
import SendMessage from './inputField'

const Chats = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room}></SendMessage>
      </div>
    </div>
  );
};

export default Chats