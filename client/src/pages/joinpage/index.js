import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';


const JoinPage = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate()
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
        navigate('/chatRoom', {replace:true})
        
    }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat room demo app`}</h1>
        <input className={styles.input} placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>

        <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
          <option>Select room</option>
          <option value='test'>Test</option>
          <option value='chat'>Chat</option>
        </select>
        <button className='btn' onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};

export default JoinPage;