import React from 'react';
import {FlatList, View} from 'react-native';
import {samplePhotoList} from '../sampleData/sampleData';
import styled from 'styled-components/native';
import {ISampleData} from '../sampleData/ISampleData';

const ImageContainer = styled.Image`
  width: 300px;
  height: 300px;
  align-self: center;
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-top: 10px;
`;

const renderImage = (image: ISampleData) => {
  return <ImageContainer source={{uri: image.url}} />;
};

export const PhotoList = () => {
  return (
    <View>
      <FlatList<ISampleData>
        showsVerticalScrollIndicator={false}
        data={samplePhotoList || []}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => renderImage(item)}
      />
    </View>
  );
};
