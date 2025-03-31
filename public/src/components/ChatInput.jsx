import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    if (emoji && emoji.emoji) {
      setMsg((prevMsg) => prevMsg + emoji.emoji);
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  color: black;

  .button-container {
    display: flex;
    align-items: center;
    color: black;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: #ffc107;
        cursor: pointer;
      }

      .emoji-picker {
        position: absolute;
        bottom: 50px; /* Adjust based on input field height */
        left: 0;
        z-index: 10;

        .emoji-picker-react {
          background-color: #f5f5f5;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          border-color: #dcdcdc;

          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #f5f5f5;
            width: 5px;

            &-thumb {
              background-color: #ffc107;
            }
          }

          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }

          .emoji-search {
            background-color: transparent;
            border-color: #dcdcdc;
          }

          .emoji-group:before {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #dcdcdc;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    margin-left: 1rem;

    input {
      flex-grow: 1;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.1rem;

      &::selection {
        background-color: #ffc107;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffc107;
      border: none;
      cursor: pointer;

      svg {
        font-size: 1.5rem;
        color: #f5f5f5;
      }
    }
  }
`;
