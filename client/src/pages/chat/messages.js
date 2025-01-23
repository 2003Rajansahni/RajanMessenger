// // client/src/pages/chat/messages.js

// import styles from './styles.module.css';
// import { useState, useEffect, useRef } from 'react';

// const Messages = ({ socket }) => {
//   const [messagesRecieved, setMessagesReceived] = useState([]);

//   const messagesColumnRef = useRef(null); // Add this

//   // Runs whenever a socket event is recieved from the server
//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data);
//       setMessagesReceived((state) => [
//         ...state,
//         {
//           message: data.message,
//           username: data.username,
//           __createdtime__: data.__createdtime__,
//         },
//       ]);
//     });

//     // Remove event listener on component unmount
//     return () => socket.off('receive_message');
//   }, [socket]);

//   // Add this
//   useEffect(() => {
//     // Last 100 messages sent in the chat room (fetched from the db in backend)
//     socket.on('last_100_messages', (last100Messages) => {
//       console.log('Last 100 messages:', JSON.parse(last100Messages));
//       last100Messages = JSON.parse(last100Messages);
//       // Sort these messages by __createdtime__
//       last100Messages = sortMessagesByDate(last100Messages);
//       setMessagesReceived((state) => [...last100Messages, ...state]);
//     });

//     return () => socket.off('last_100_messages');
//   }, [socket]);

//   // Add this
//   // Scroll to the most recent message
//   useEffect(() => {
//     messagesColumnRef.current.scrollTop =
//       messagesColumnRef.current.scrollHeight;
//   }, [messagesRecieved]);

//   // Add this
//   function sortMessagesByDate(messages) {
//     return messages.sort(
//       (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
//     );
//   }

//   // dd/mm/yyyy, hh:mm:ss
//   function formatDateFromTimestamp(timestamp) {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   }

//   return (
//     // Add ref to this div
//     <div className={styles.messagesColumn} ref={messagesColumnRef}>
//       {messagesRecieved.map((msg, i) => (
//         <div className={styles.message} key={i}>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span className={styles.msgMeta}>{msg.username}</span>
//             <span className={styles.msgMeta}>
//               {formatDateFromTimestamp(msg.__createdtime__)}
//             </span>
//           </div>
//           <p className={styles.msgText}>{msg.message}</p>
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;




// import styles from './styles.module.css';
// import { useState, useEffect, useRef } from 'react';

// const Messages = ({ socket }) => {
//   const [messagesRecieved, setMessagesReceived] = useState([]);

//   const messagesColumnRef = useRef(null);

//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data);
//       setMessagesReceived((state) => [
//         ...state,
//         {
//           message: data.message,
//           username: data.username,
//           __createdtime__: data.__createdtime__, // Ensure this is a timestamp (number)
//         },
//       ]);
//     });

//     return () => socket.off('receive_message');
//   }, [socket]);

//   useEffect(() => {
//     socket.on('last_100_messages', (last100Messages) => {
//       console.log('Last 100 messages:', JSON.parse(last100Messages));
//       last100Messages = JSON.parse(last100Messages);
//       last100Messages = sortMessagesByDate(last100Messages);
//       setMessagesReceived((state) => [...last100Messages, ...state]);
//     });

//     return () => socket.off('last_100_messages');
//   }, [socket]);

//   useEffect(() => {
//     messagesColumnRef.current.scrollTop =
//       messagesColumnRef.current.scrollHeight;
//   }, [messagesRecieved]);

//   function sortMessagesByDate(messages) {
//     return messages.sort(
//       (a, b) => a.__createdtime__ - b.__createdtime__ // Ensure timestamps are compared as numbers
//     );
//   }

//   function formatDateFromTimestamp(timestamp) {
//     // Ensure timestamp is valid
//     const date = new Date(timestamp);
//     return date.toLocaleString(); // Format the date and time
//   }

//   return (
//     <div className={styles.messagesColumn} ref={messagesColumnRef}>
//       {messagesRecieved.map((msg, i) => (
//         <div className={styles.message} key={i}>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span className={styles.msgMeta}>{msg.username}</span>
//             <span className={styles.msgMeta}>
//               {formatDateFromTimestamp(msg.__createdtime__)} {/* Format timestamp correctly */}
//             </span>
//           </div>
//           <p className={styles.msgText}>{msg.message}</p>
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;



import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    socket.on('leave_room', (data) => {
      console.log('User has left the room:', data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: `${data.username} has left the chat room`,
          username: 'ChatBot',
          __createdtime__: Date.now(),
        },
      ]);
    });

    return () => socket.off('leave_room');
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
