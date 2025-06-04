# Chat App

Chit Chat App is a real-time messaging application built using the MERN stack (MongoDB, Express, React, Node.js) along with Socket.io for real-time, bi-directional communication. It allows users to register, log in, set a profile avatar, and send/receive messages instantly with other users.

---

## Features

- User registration and login with validation
- Avatar setup during profile configuration
- Real-time one-on-one messaging using WebSockets
- Message storage and retrieval using MongoDB
- Emoji support within chat
- Responsive user interface

---

## Technology Stack

### Frontend:

- React.js
- React Router DOM
- Styled-components
- Axios
- Emoji Picker React

### Backend:

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

---

## Project Structure

```
Chit_Chat_App/
│
├── client/               # React frontend
│   └── src/
│       ├── components/   # Chat UI components
│       ├── pages/        # Register, Login, Chat, SetAvatar pages
│       ├── utils/        # API route definitions
│       └── App.js        # Routing configuration
│
├── server/               # Backend server
│   ├── controllers/      # Business logic for user/messages
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route handlers
│   └── index.js          # Entry point and socket.io setup
```

---

## Setup Instructions

### Prerequisites

- Node.js and npm
- MongoDB instance (local or Atlas)

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
npm install
```

2. Create a `.env` file in the root of `server/` with:

```
MONGO_URL=your_mongo_connection_string
PORT=5000
```

3. Start the backend:

```bash
node index.js
```

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
npm install
```

2. Start the frontend React app:

```bash
npm start
```

3. App runs at: `http://localhost:3000`

---

## Future Improvements

- Add group chat support
- Display message read/delivery status
- Integrate WebRTC for voice/video calls
- Add push notifications
- Enable end-to-end encryption

---


