import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PropertyPhoto {
  name: string;
  uploadedDate: string;
}

interface PropertyPhotosState {
  uploadedPhotos: PropertyPhoto[];
  isFormCompleted:boolean;
  isApplicationSubmitted:boolean;
}

const initialState: PropertyPhotosState = {
  uploadedPhotos: [],
  isApplicationSubmitted:false,
  isFormCompleted:false
};

const propertyPhotosSlice = createSlice({
  name: 'propertyPhotos',
  initialState,
  reducers: {
    addPhotos: (state, action: PayloadAction<PropertyPhoto[]>) => {
      state.uploadedPhotos.push(...action.payload);
      console.log(`photo ${action.payload} is added`)

    },
    removePhoto: (state, action: PayloadAction<string>) => {
      state.uploadedPhotos = state.uploadedPhotos.filter(
        (photo) => photo.name !== action.payload
       
      );
      console.log(`photo ${action.payload} is removed`)
    },
    markFormCompleted: (state: PropertyPhotosState) => {
        console.log('Marking Inspection Form as completed');
        state.isFormCompleted = true;
      },
  },
});

export const { addPhotos, removePhoto,markFormCompleted } = propertyPhotosSlice.actions;
export default propertyPhotosSlice.reducer;
