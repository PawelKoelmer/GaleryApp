import {IImage} from './Image.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
  },
});

export const {addImageReducer, updateImageReducer} = imagesSlice.actions;
export default imagesSlice.reducer;
