import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreens, NavigationScreensProps} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {IImage} from '../redux/Image.types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reduxStore';
import styled from 'styled-components/native';
import {current} from '@reduxjs/toolkit';
import {CustomButton} from '../components/CustomButton';
import {updateImage} from '../redux/actions/imageActions';

const Title = styled.Text`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
`;

const ImageContainer = styled.Image`
  width: 80%;
  height: 400px;
  align-self: center;
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-top: 10px;
`;

const CommentContainer = styled.Text`
  margin-top: 20px;
  padding: 10px;
  align-self: center;
  text-align: center;
  width: 80%;
  border: black solid 2px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.TextInput`
  margin-top: 20px;
  padding: 10px;
  align-self: center;
  text-align: center;
  width: 80%;
  border: black solid 2px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

interface Props {
  route: RouteProp<NavigationScreensProps, NavigationScreens.PREVIEW_PHOTO>;
}

export const PreviewImage = ({route}: Props) => {
  const dispatch = useDispatch<any>();
  const input = useRef<TextInput>(null);
  const [photoData, setPhotoData] = useState<IImage>();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string | null>(null);
  const photoState = useSelector((state: RootState) => state.images.images);

  useEffect(() => {
    const photoID = route.params?.id;
    const details = photoState.find(item => item.id === photoID);
    if (details) {
      setEditedComment(details.comment);
      setPhotoData(details);
    }
  }, []);

  const savePhotoHandler = () => {
    if (photoData?.id && editedComment) {
      dispatch(updateImage(photoData.id, editedComment));
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'position'}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (input.current) input.current.blur();
        }}>
        <View>
          <Title>{photoData?.title}</Title>
          <ImageContainer
            source={{
              uri:
                Platform.OS === 'ios'
                  ? photoData?.url
                  : 'file://' + photoData?.url,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsEdited(true);
            }}>
            {isEdited ? (
              <CommentInput
                ref={input}
                multiline
                autoFocus={true}
                value={editedComment}
                onBlur={() => setIsEdited(false)}
                onChangeText={setEditedComment}></CommentInput>
            ) : (
              <CommentContainer>{editedComment}</CommentContainer>
            )}
          </TouchableOpacity>
          {photoData?.comment !== editedComment ? (
            <CustomButton
              buttonText={'Save changes'}
              onPress={() => {
                savePhotoHandler();
              }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
