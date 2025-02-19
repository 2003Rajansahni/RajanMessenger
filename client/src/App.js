// // client/src/App.js

// import './App.css';
// import { useState } from 'react';
// import Home from './pages/home';
// import Chat from './pages/chat';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import io from 'socket.io-client';
// //import Sender from './pages/harish/Sender';
// //import Recieveer from './pages/harish/Reciever';
// //import Navbar from './pages/harish/Navbar';

// const socket = io.connect('http://localhost:4000');

// function App() {
//   const [username, setUsername] = useState('');
//   const [room, setRoom] = useState('');

//   return (
//     <Router>
//       <div className='App'>
  
//         <Routes>
//           <Route
//             path='/'
//             element={
//               <Home
//                 username={username}
//                 setUsername={setUsername}
//                 room={room}
//                 setRoom={setRoom}
//                 socket={socket}
//               />
//             }
//           />
//           {/* Add this */}
//           <Route
//             path='/chat'
//             element={<Chat username={username} room={room} socket={socket} />}
//           />
          
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import './App.css';
import { useState } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

