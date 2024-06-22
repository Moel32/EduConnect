// components/AnimatedMessage.tsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const MessageContainer = styled.div`
  animation: 2s ${fadeInAnimation};
  text-align: center;
  background-color: #f7fafc;
  color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const AnimatedMessage: React.FC = () => {
  return (
    <MessageContainer>
      <p>This feature is still under development.</p>
    </MessageContainer>
  );
};

export default AnimatedMessage;
