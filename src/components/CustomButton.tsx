import React from 'react';
import styled from 'styled-components/native';

const ButtonText = styled.Text`
  size: 20px;
  text-align: center;
  padding: 15px;
  color: white;
`;

const ButtonField = styled.TouchableOpacity`
  align-self: center;
  background: #00008b;
  width: 50%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

interface Props {
  buttonText: string;
  onPress(): void;
}

export const CustomButton = ({onPress, buttonText}: Props) => {
  return (
    <ButtonField onPress={onPress}>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonField>
  );
};
