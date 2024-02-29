import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChatScreenMenuModalVisible: false,
  isAccountSettingsModalVisible:false,
  isSSSModalVisible:false,
  isHelpModalVisible:false,
  isLicenceModalVisible:false
  
};
export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
               toggleChatScreenMenuVisible: (state, action) => {
                              state.isChatScreenMenuModalVisible = action.payload;
                },
                toggleAccountSettingsModalVisible: (state, action) => {
                  state.isAccountSettingsModalVisible = action.payload;
    },

    toggleSSSModalVisible: (state, action) => {
      state.isSSSModalVisible = action.payload;
},

toggleHelpModalVisible: (state, action) => {
  state.isHelpModalVisible = action.payload;
},
toggleLicenceModalVisible: (state, action) => {
  state.isLicenceModalVisible = action.payload;
},


   
  },
});

export const {toggleChatScreenMenuVisible,toggleAccountSettingsModalVisible,toggleHelpModalVisible,toggleLicenceModalVisible,toggleSSSModalVisible} = modalSlice.actions;

export const selectIsChatScreenMenuModalVisible = state => state.modals.isChatScreenMenuModalVisible;
export const selectIsAccountSettingsModalVisible = state => state.modals.isAccountSettingsModalVisible;
export const selectIsSSSModalVisible = state => state.modals.isSSSModalVisible;
export const selectIsHelpModalVisible = state => state.modals.isHelpModalVisible;
export const selectIsLicenceModalVisible = state => state.modals.isLicenceModalVisible;


export default modalSlice.reducer;


