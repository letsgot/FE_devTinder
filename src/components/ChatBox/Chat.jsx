// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { createSocketConnection } from '../../constants/socket';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const user = useSelector(state => state.user.user);
//   const targetUserId = useParams().toTargetUser;


//   useEffect(() => {
//     const socket = createSocketConnection();
//     socket.emit('joinChat', {
//       userId: user?._id,
//       targetUserId: targetUserId
//     });

//     socket.on('receiveMessage', ({ firstName, text }) => {

//     })

//     return () => {
//       socket.disconnect();
//     }
//   }, [user, targetUserId])

//   const handleSend = () => {
//     const socket = createSocketConnection();
//     socket.emit('sendMessage', { input: input, firstName: user?.firstName });
//   }

//   return (
//     <div className="w-full max-w-xl mx-auto flex flex-col h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
//       <div className='p-5 border-b border-gray-300 text-center'>Chat</div>
//       <div className='flex-1 overflow-y-auto '>
//         {messages.map((message) => {
//           <div className="chat chat-start">
//             <div className="chat-header">
//               Obi-Wan Kenobi
//               <time className="text-xs opacity-50">2 hours ago</time>
//             </div>
//             <div className="chat-bubble">You were the Chosen One!</div>
//             <div className="chat-footer opacity-50">Seen</div>
//           </div>
//         })}

//       </div>
//       <div className='flex p-3 gap-2'>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={() => handleSend()}
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../../constants/socket';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const user = useSelector(state => state.user.user);
  const targetUserId = useParams().toTargetUser;
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    const roomId = [user?._id, targetUserId].sort().join('-');
    socket.emit('joinChat', {
      userId: user?._id,
      targetUserId
    });

    socket.on('receiveMessage', ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, targetUserId]);

  const handleSend = () => {
    if (!input.trim()) return;

    socketRef.current?.emit('sendMessage', {
      firstName: user?.firstName,
      text: input,
    });
    setInput('');
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
      <div className='p-5 border-b border-gray-300 text-center'>Chat</div>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <div className="font-semibold">{message.firstName}:</div>
            <div className="chat-bubble p-2 rounded">{message.text}</div>
          </div>
        ))}
      </div>
      <div className='flex p-3 gap-2'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
