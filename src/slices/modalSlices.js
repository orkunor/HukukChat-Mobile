import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChatScreenMenuModalVisible: false,
 
  
};
export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
               toggleChatScreenMenuVisible: (state, action) => {
                              state.isChatScreenMenuModalVisible = action.payload;
                },
   
  },
});

export const {toggleChatScreenMenuVisible} = modalSlice.actions;

export const selectIsChatScreenMenuModalVisible = state => state.modals.isChatScreenMenuModalVisible;


export default modalSlice.reducer;


