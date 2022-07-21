import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {IImage} from '../redux/Image.types';
import {RootState} from '../redux/reduxStore';
import {useSelector} from 'react-redux';

const ImageContainer = styled.Image`
  width: 300px;
  height: 300px;
  align-self: center;
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-top: 10px;
`;

const renderImage = (image: IImage) => {
  return <ImageContainer source={{uri: image.url}} />;
};

export const PhotoList = () => {
  const imagesState = useSelector((state: RootState) => state.images.images);

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
