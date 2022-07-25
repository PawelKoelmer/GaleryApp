import {IImage} from './Image.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';
import RNFS from 'react-native-fs';

interface IImagesState {
  images: IImage[];
}

const initialState: IImagesState = {images: []};

export const imagesSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {
    addImageReducer: (state, action: PayloadAction<IImage>) => {
      state.images.push(action.payload);
    },
    updateImageReducer: (state, action) => {
      const index = state.images.findIndex(
        photo => photo.id === action.payload.id,
      );
      state.images[index].comment = action.payload.newComment;
    },
    deleteImageReducer: (state, action) => {
      const index = state.images.findIndex(
        photo => photo.id === action.payload.id,
      );
      state.images.splice(index, 1);
      if (state.images[index].url) {
        RNFS.unlink(state.images[index].url).catch(reason =>
          console.log(reason),
        );
      }
    },
  },
});

export const {addImageReducer, updateImageReducer, deleteImageReducer} =
  imagesSlice.actions;
export default imagesSlice.reducer;
