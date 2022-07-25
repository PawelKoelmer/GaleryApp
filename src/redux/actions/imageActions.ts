import {IImage} from '../Image.types';
import {
  addImageReducer,
  updateImageReducer,
  deleteImageReducer,
} from '../images';

export const addImage = (imageData: IImage) => {
  return dispatch => {
    imageData.id = Date.now();
    dispatch(addImageReducer(imageData));
  };
};

export const updateImage = (id: number, newComment: string) => {
  const objectToUpdate = {id: id, newComment: newComment};
  return dispatch => {
    dispatch(updateImageReducer(objectToUpdate));
  };
};

export const deleteImage = (id: number) => {
  return dispatch => {
    dispatch(deleteImageReducer(id));
  };
};
