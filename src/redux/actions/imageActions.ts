import {IImage} from '../Image.types';
import {addImageReducer} from '../images';

export const addImage = (imageData: IImage) => {
  return dispatch => {
    imageData.id = Date.now();
    dispatch(addImageReducer(imageData));
  };
};
