import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {IImage} from '../redux/Image.types';
import {RootState} from '../redux/reduxStore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreens, NavigationScreensProps} from '../../App';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

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
  const imagesState = useSelector((state: RootState) => state.images.images);
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationScreensProps>>();

  const renderImage = (image: IImage) => {
    return (
      image &&
      image.id && (
        <TouchableOpacity
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
    <View>
      <FlatList<IImage>
        showsVerticalScrollIndicator={false}
        data={imagesState}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => renderImage(item)}
      />
    </View>
  );
};
