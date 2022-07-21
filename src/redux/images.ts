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
  },
});

export const {addImageReducer} = imagesSlice.actions;
export default imagesSlice.reducer;
