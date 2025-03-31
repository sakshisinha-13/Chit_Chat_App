import React from 'react';
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      {currentUser && (
        <>
          <h1>
            Welcome, <span>{currentUser.username}!</span>
          </h1>
          <h3>Please select a chat to start messaging.</h3>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black; /* Set text color to black */
  flex-direction: column;
  padding: 2rem;

  h1, h3 {
    margin: 0.5rem 0;
  }

  span {
    color: #4e0eff; /* Optionally, keep span color if needed */
  }
`;
