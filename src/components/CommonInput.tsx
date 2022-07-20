import React from 'react';
import styled from 'styled-components/native';

const Label = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const InputField = styled.TextInput<{multiline: boolean}>`
  align-self: center;
  width: 80%;
  border: black solid 1px;
  border-radius: 10px;
  padding: 10px;
  margin: 16px 0px 16px 0px;
  ${props => {
    if (props.multiline) {
      return 'height: 150px';
    } else return;
  }}
`;

interface Props {
  label: string;
  placeholder: string;
  isMultiline?: boolean;
}

export const CommonInput = ({label, isMultiline, placeholder}: Props) => {
  return (
    <>
      <Label>{label}</Label>
      <InputField
        multiline={isMultiline}
        placeholder={placeholder}></InputField>
    </>
  );
};
