import React from 'react';
import styled from 'styled-components/native';

const Label = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const InputField = styled.TextInput`
  align-self: center;
  width: 80%;
  border: black solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin: 16px 0px 16px 0px;
`;

interface Props {
  label: string;
  placeholder: string;
  isMultiline?: boolean;
  onTextChange(text: string): void;
}

export const CommonInput = ({
  label,
  isMultiline,
  placeholder,
  onTextChange,
}: Props) => {
  return (
    <>
      <Label>{label}</Label>
      <InputField
        multiline={isMultiline}
        placeholder={placeholder}
        onChangeText={onTextChange}></InputField>
    </>
  );
};
