import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChatScreenMenuModalVisible: false,
  isAccountSettingsModalVisible:false,
  isSSSModalVisible:false,
  isHelpModalVisible:false,
  isLicenceModalVisible:false,
  isKVKKModalVisible:false,
  
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
toggleKVKKModalVisible: (state, action) => {
  state.isKVKKModalVisible = action.payload;
},


   
  },
});

export const {toggleKVKKModalVisible,toggleChatScreenMenuVisible,toggleAccountSettingsModalVisible,toggleHelpModalVisible,toggleLicenceModalVisible,toggleSSSModalVisible} = modalSlice.actions;

export const selectIsChatScreenMenuModalVisible = state => state.modals.isChatScreenMenuModalVisible;
export const selectIsAccountSettingsModalVisible = state => state.modals.isAccountSettingsModalVisible;
export const selectIsSSSModalVisible = state => state.modals.isSSSModalVisible;
export const selectIsHelpModalVisible = state => state.modals.isHelpModalVisible;
export const selectIsLicenceModalVisible = state => state.modals.isLicenceModalVisible;
export const selectIsKVKKModalVisible = state => state.modals.isKVKKModalVisible;


export default modalSlice.reducer;


