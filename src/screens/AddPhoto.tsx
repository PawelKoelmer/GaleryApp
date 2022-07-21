import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {CustomButton} from '../components/CustomButton';
import {CameraView} from '../components/CameraView';
import {CommonInput} from '../components/CommonInput';
import {useDispatch} from 'react-redux';
import {addImage} from '../redux/actions/imageActions';
import RNFS from 'react-native-fs';

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

  const saveFileToDocuments = () => {
    if (imageLink) {
      const fileName = imageLink.split('/').pop();
      RNFS.copyFile(imageLink, `${RNFS.DocumentDirectoryPath}/${fileName}`)
        .then(() => {
          RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then(response => {
              setImageLink(response[response.length - 1].path);
            })
            .catch(reason => console.log(reason));
        })
        .catch(reason => {
          console.log(reason);
        });
    }
  };

  const saveImageHandler = () => {
    if (imageComment && imageTitle && imageLink) {
      saveFileToDocuments();
      dispatch(
        addImage({
          title: imageTitle,
          comment: imageComment,
          url: imageLink,
        }),
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="position"
          keyboardVerticalOffset={offset}>
          {imageLink ? (
            <ImageContainer source={{uri: 'file://' + imageLink}} />
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
              Keyboard.dismiss;
              setCameraVisible(true);
              setImageLink(null);
            }}
          />
          {imageLink ? (
            <CustomButton
              buttonText={'save image'}
              onPress={() => {
                saveImageHandler();
              }}
            />
          ) : null}
        </KeyboardAvoidingView>
        {isCameraVisible && (
          <CameraView
            hideCameraView={() => setCameraVisible(false)}
            setImageLink={setImageLink}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
