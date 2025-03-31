import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRoute, getAllMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = JSON.parse(localStorage.getItem('chat-app-user'));
        if (data && currentChat) {
          const response = await axios.post(getAllMessageRoute, {
            from: data._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      const data = JSON.parse(localStorage.getItem('chat-app-user'));
      if (data && currentChat) {
        // Emit message via socket
        socket.current.emit('send-msg', {
          from: data._id,
          to: currentChat._id,
          msg,
        });

        // Send message via HTTP
        await axios.post(sendMessageRoute, {
          from: data._id,
          to: currentChat._id,
          message: msg,
        });

        // Update messages state
        setMessages(prevMessages => [...prevMessages, { fromSelf: true, message: msg }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setMessages(prevMessages => [...prevMessages, { fromSelf: false, message: msg }]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off('msg-recieve');
      }
    };
  }, [socket, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={uuidv4()} className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
              <div className="content">
                <p style={{ color: 'black' }}>{message.message}</p> {/* Ensure text color is black */}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .username {
        h3 {
          color: white;
          font-size: 1.2rem;
          margin: 0;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ffffff39 transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 10px;
    }

    .message {
      display: flex;
      justify-content: ${props => props.theme === 'dark' ? 'flex-end' : 'flex-start'};
      margin-bottom: 1rem;

      .content {
        padding: 1rem;
        border-radius: 1rem;
        background-color: ${props => props.theme === 'dark' ? '#4f04ff21' : '#9900ff20'};
        color: #d1d1d1;
        max-width: 70%;
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
        color: black; /* Ensure text color is black */
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
        color: black; /* Ensure text color is black */
      }
    }
  }
`;
