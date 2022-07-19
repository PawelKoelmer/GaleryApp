import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {CustomButton} from '../components/CustomButton';
import {CameraView} from '../components/CameraView';

const ImageContainer = styled.Image`
  align-self: center;
  width: 300px;
  height: 300px;
`;

export const AddPhoto = () => {
  const [isCameraVisible, setCameraVisible] = useState<boolean>(false);

  return (
    <View>
      <ImageContainer source={require('../assets/defaultPlaceholder.png')} />
      <CustomButton
        buttonText={'Get photo from camera'}
        onPress={() => setCameraVisible(true)}></CustomButton>

      {isCameraVisible && <CameraView />}
    </View>
  );
};
