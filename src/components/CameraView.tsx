import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

const AbsoluteContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  flex: 1;
`;

const ImagePreviewFooter = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: black;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

const CameraButton = styled.View`
  position: absolute;
  top: 90%;
  border: white solid 2px;
  padding: 10px;
  border-radius: 25px;
  align-self: center;
  text-align: start;
`;

interface Props {
  hideCameraView(): void;
  setImageLink(imagePath: string): void;
}

export const CameraView = ({hideCameraView, setImageLink}: Props) => {
  const camera = useRef<Camera>(null);
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>();
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    Camera.requestCameraPermission()
      .then(response => {
        setCameraPermissionStatus(response);
      })
      .catch(reason => console.log(reason));
    return () => {
      camera.current?.setState(false);
    };
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const takePicture = () => {
    if (camera?.current) {
      camera.current
        .takePhoto()
        .then(data => {
          setMediaUrl(data.path);
        })
        .catch(reason => console.log(reason));
    }
  };

  return (
    <AbsoluteContainer>
      {cameraPermissionStatus === 'authorized' && device ? (
        <Camera
          ref={camera}
          device={device}
          isActive={true}
          style={StyleSheet.absoluteFill}
          photo={true}
        />
      ) : null}
      {mediaUrl !== null ? (
        <AbsoluteContainer>
          <Image
            source={{
              uri: Platform.OS === 'ios' ? mediaUrl : `file:// + ${mediaUrl}`,
            }}
            style={{flex: 1}}
          />
          <ImagePreviewFooter>
            <TouchableOpacity
              onPress={() => {
                RNFS.unlink(mediaUrl);
                setMediaUrl(null);
              }}>
              <ButtonText>Retake</ButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImageLink(mediaUrl);
                hideCameraView();
              }}>
              <ButtonText>Select</ButtonText>
            </TouchableOpacity>
          </ImagePreviewFooter>
        </AbsoluteContainer>
      ) : null}
      {!mediaUrl ? (
        <CameraButton>
          <IonicIcons
            name={'camera'}
            size={24}
            style={{color: '#fff'}}
            onPress={takePicture}
          />
        </CameraButton>
      ) : null}
    </AbsoluteContainer>
  );
};
