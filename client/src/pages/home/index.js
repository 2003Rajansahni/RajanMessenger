// client/src/pages/home/index.js

import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });  // Emit the 'join_room' event
      navigate('/chat', { replace: true }); // Redirect to /chat after emitting the event
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input 
          className={styles.input} 
          placeholder='Username...' 
          onChange={(e) => setUsername(e.target.value)} 
        />

        {/* <select 
          className={styles.input} 
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='computer science Group' className=''>computer science Group</option>
          <option value='Civil Group'>Civil Group</option>
          <option value='Medical Group'>Medical Group</option>
          <option value='Mechanical group'>Mechanical group</option>
        </select> */}
           <select
  className={`${styles.input} bg-gray-200 text-gray-700 rounded-lg p-2 shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
  onChange={(e) => setRoom(e.target.value)}
>
  <option className="text-gray-500">-- Select Room --</option>
  <option value='computer science Group' className="hover:bg-blue-100">computer science Group</option>
  <option value='Civil Group' className="hover:bg-blue-100">Civil Group</option>
  <option value='Medical Group' className="hover:bg-blue-100">Medical Group</option>
  <option value='Mechanical group' className="hover:bg-blue-100">Mechanical group</option>
</select>



        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom} // Call joinRoom on button click
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
