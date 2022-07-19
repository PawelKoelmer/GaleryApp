import React from 'react';
import styled from 'styled-components/native';

const CameraContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  flex: 1;
`;

export const CameraView = () => {
  return <CameraContainer></CameraContainer>;
};
