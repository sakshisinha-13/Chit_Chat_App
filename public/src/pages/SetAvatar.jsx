import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [colors] = useState(["red", "blue", "green", "orange"]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false); // No loading needed now

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select a color avatar", toastOptions);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const selectedColor = colors[selectedAvatar];

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: selectedColor, // sending color string only
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = selectedColor;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (error) {
      console.error("Error setting profile picture:", error);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick a Color Avatar</h1>
          </div>
          <div className="avatars">
            {colors.map((color, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <div className="color-circle" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--white);
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: var(--black);
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      transition: 0.3s;
      cursor: pointer;

      .color-circle {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
      }
    }

    .selected {
      border: 0.4rem solid #00ff00;
    }
  }

  .submit-btn {
    background-color: #00ff00;
    color: var(--white);
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #00cc00;
    }
  }
`;
