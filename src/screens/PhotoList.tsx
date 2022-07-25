import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {IImage} from '../redux/Image.types';
import {RootState} from '../redux/reduxStore';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreens, NavigationScreensProps} from '../../App';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {DeleteModal} from '../components/DeleteModal';
import {deleteImage} from '../redux/actions/imageActions';

const ImageContainer = styled.Image`
  width: 300px;
  height: 300px;
  align-self: center;
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-top: 10px;
`;

export const PhotoList = () => {
  const dispatch = useDispatch<any>();
  const imagesState = useSelector((state: RootState) => state.images.images);
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationScreensProps>>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageToDeleteId, setImageToDeleteId] = useState<number>();

  const deleteImageHandler = () => {
    if (imageToDeleteId) dispatch(deleteImage(imageToDeleteId));
  };

  const renderImage = (image: IImage) => {
    return (
      image.id && (
        <TouchableOpacity
          onLongPress={() => {
            setImageToDeleteId(image.id);
            setIsModalVisible(true);
          }}
          onPress={() => {
            image.id &&
              navigation.navigate(NavigationScreens.PREVIEW_PHOTO, {
                id: image.id,
              });
          }}>
          <ImageContainer source={{uri: 'file://' + image.url}} />
        </TouchableOpacity>
      )
    );
  };

  return (
    <View style={{flex: 1}}>
      <DeleteModal
        isModalVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        deleteImage={deleteImageHandler}
      />
      <FlatList<IImage>
        showsVerticalScrollIndicator={false}
        data={imagesState}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => renderImage(item)}
      />
    </View>
  );
};
