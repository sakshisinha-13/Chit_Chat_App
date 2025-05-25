import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

export default function Chat(){
    const socket = useRef(null);
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded]=useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const user = localStorage.getItem("chat-app-user");
            console.log("Checking user:", user);
            
            if(!user) {
                console.log("No user found, redirecting to login");
                navigate("/login");
            } else {
                try {
                    const parsedUser = JSON.parse(user);
                    console.log("Parsed user:", parsedUser);
                    setCurrentUser(parsedUser);
                    setIsLoaded(true);
                } catch (error) {
                    console.error("Error parsing user:", error);
                    localStorage.removeItem("chat-app-user");
                    navigate("/login");
                }
            }
        };
        checkUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            try {
                console.log("Initializing socket connection...");
                socket.current = io(host);
                
                socket.current.on("connect", () => {
                    console.log("Socket connected successfully");
                    socket.current.emit("add-user", currentUser._id);
                });

                socket.current.on("connect_error", (error) => {
                    console.error("Socket connection error:", error);
                });

                return () => {
                    if (socket.current) {
                        console.log("Cleaning up socket connection");
                        socket.current.disconnect();
                    }
                };
            } catch (error) {
                console.error("Error initializing socket:", error);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchContacts = async () => {
            if(currentUser) {
                console.log("Current user state:", currentUser);
                if(currentUser.isAvatarImageSet) {
                    try {
                        console.log("Fetching contacts...");
                        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        console.log("Fetched contacts:", data);
                        setContacts(data);
                    } catch (error) {
                        console.error("Error fetching contacts:", error);
                    }
                } else {
                    console.log("No avatar set, redirecting to setAvatar");
                    navigate("/setAvatar");
                }
            }
        };
        fetchContacts();
    }, [currentUser, navigate]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className="container">
                <Contacts 
                    contacts={contacts} 
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                {currentChat===undefined ? (
                    <Welcome currentUser={currentUser}/>
                ) : (
                    <ChatContainer 
                        currentChat={currentChat} 
                        currentUser={currentUser}
                        socket={socket}
                    />
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;
