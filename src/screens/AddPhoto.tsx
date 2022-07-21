import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import styled from 'styled-components/native';
import {CustomButton} from '../components/CustomButton';
import {CameraView} from '../components/CameraView';
import {CommonInput} from '../components/CommonInput';
import {useDispatch} from 'react-redux';
import {addImage} from '../redux/actions/imageActions';

const ImageContainer = styled.Image`
  align-self: center;
  width: 200px;
  height: 200px;
  margin: 10px 0px 10px 0px;
`;

export const AddPhoto = () => {
  const [isCameraVisible, setCameraVisible] = useState<boolean>(false);
  const [imageTitle, setImageTitle] = useState<string | null>(null);
  const [imageComment, setImageComment] = useState<string | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const offset = Platform.OS === 'ios' ? 40 : 0;
  const dispatch = useDispatch<any>();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="position"
        keyboardVerticalOffset={offset}>
        {imageLink ? (
          <ImageContainer
            source={{
              uri: Platform.OS === 'ios' ? imageLink : `file://${imageLink}`,
            }}
          />
        ) : (
          <ImageContainer
            source={require('../assets/defaultPlaceholder.png')}
          />
        )}

        <CommonInput
          label={'Title'}
          placeholder={'Input title here...'}
          onTextChange={setImageTitle}
        />
        <CommonInput
          label={'Comment'}
          placeholder={'Input comment here...'}
          isMultiline={true}
          onTextChange={setImageComment}
        />
        <CustomButton
          buttonText={'Get photo from camera'}
          onPress={() => {
            setCameraVisible(true);
            setImageLink(null);
          }}
        />

        {imageLink ? (
          <CustomButton
            buttonText={'save image'}
            onPress={() => {
              if (imageComment && imageTitle) {
                dispatch(
                  addImage({
                    title: imageTitle,
                    comment: imageComment,
                    url: imageLink,
                  }),
                );
              }
            }}
          />
        ) : null}
      </KeyboardAvoidingView>
      {isCameraVisible && (
        <CameraView
          hideCameraView={() => setCameraVisible(false)}
          getImageHandler={setImageLink}
        />
      )}
    </>
  );
};
