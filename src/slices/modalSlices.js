import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChatScreenMenuModalVisible: false,
  isAccountSettingsModalVisible: false,
  isSSSModalVisible: false,
  isHelpModalVisible: false,
  isLicenceModalVisible: false,
  isKVKKModalVisible: false,
  isWrongPassOrMailModalVisible: false,
  isServerErrorModalVisible: false,
  isMailAlreadyInUseVisible:false,
  isNoteSendedVisible:false,
  isUserCreatedVisible:false,
  isUserNameAlreadyInUseVisible:false,
  isWarningFuncVisible:false,
  isChatHistoryModalVisible:false,
  counter: 0,
  isLoginAgainModalVisible:false,
  isChatSettingsModalVisible:false,
  isPaymentModalVisible:false,
  isCreditModalVisible:false,

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
    toggleWrongPassOrMailModalVisible: (state, action) => {
      state.isWrongPassOrMailModalVisible = action.payload;
    },
    toggleServerErrorModalVisible: (state, action) => {
      state.isServerErrorModalVisible = action.payload;
    },
    toggleMailAlreadyInUse: (state, action) => {
      state.isMailAlreadyInUseVisible = action.payload;
    },
    toggleNoteSendedVisible: (state, action) => {
      state.isNoteSendedVisible = action.payload;
    },
    toggleUserNameAlreadyInUseVisible: (state, action) => {
      state.isUserNameAlreadyInUseVisible = action.payload;
    },
    toggleUserCreated: (state, action) => {
      state.isUserCreatedVisible = action.payload;
    },
    toggleWarningFuncVisible: (state, action) => {
      state.isWarningFuncVisible = action.payload;
    },
    toggleChatHistoryModalVisible: (state, action) => {
      state.isChatHistoryModalVisible = action.payload;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    toggleLoginAgainModalVisible: (state, action) => {
      state.isLoginAgainModalVisible = action.payload;
    },
    toggleChatSeetingsModalVisible: (state, action) => {
      state.isChatSettingsModalVisible = action.payload;
    },
    togglePaymentModalVisible: (state, action) => {
      state.isPaymentModalVisible = action.payload;
    },
    toggleCreditModal: (state, action) => {
      state.isCreditModalVisible = action.payload;
    },
  },
});

export const {
  toggleServerErrorModalVisible,
  toggleWrongPassOrMailModalVisible,
  toggleKVKKModalVisible,
  toggleChatScreenMenuVisible,
  toggleAccountSettingsModalVisible,
  toggleHelpModalVisible,
  toggleLicenceModalVisible,
  toggleSSSModalVisible,
  toggleMailAlreadyInUse,
  toggleNoteSendedVisible,
  toggleUserCreated,
  toggleUserNameAlreadyInUseVisible,
  toggleWarningFuncVisible,
toggleChatHistoryModalVisible,
setCounter,
toggleLoginAgainModalVisible,
toggleChatSeetingsModalVisible,
togglePaymentModalVisible,
toggleCreditModal
} = modalSlice.actions;

export const selectIsChatScreenMenuModalVisible = state =>
  state.modals.isChatScreenMenuModalVisible;
export const selectIsAccountSettingsModalVisible = state =>
  state.modals.isAccountSettingsModalVisible;
export const selectIsSSSModalVisible = state => state.modals.isSSSModalVisible;
export const selectIsHelpModalVisible = state =>
  state.modals.isHelpModalVisible;
export const selectIsLicenceModalVisible = state =>
  state.modals.isLicenceModalVisible;
export const selectIsKVKKModalVisible = state =>
  state.modals.isKVKKModalVisible;
export const selectIsWrongPassOrMailModalVisible = state =>
  state.modals.isWrongPassOrMailModalVisible;
export const selectIsServerErrorModalVisible = state =>
  state.modals.isServerErrorModalVisible;
  export const selectIsMailAlreadyInUseVsibile = state =>
  state.modals.isMailAlreadyInUseVisible;
  export const selectIsNoteSendedVisible = state =>
  state.modals.isNoteSendedVisible;
  export const selectIsUserNameAlreadyInUseVisible = state =>
  state.modals.isUserNameAlreadyInUseVisible;
  export const selectUserCreatedVisible = state =>
  state.modals.isUserCreatedVisible;
  export const selectIsWarningFuncVisible = state =>
  state.modals.isWarningFuncVisible;
  export const selectIsChatHistoryModalVisible = state =>
  state.modals.isChatHistoryModalVisible;
  export const selectCounter = state =>
  state.modals.counter;
  export const selectIsLoginAgainModalVisible = state =>
  state.modals.isLoginAgainModalVisible;
  export const selectIsChatSettingsModalVisible = state =>
  state.modals.isChatSettingsModalVisible;
  export const selectIsPaymentModalVisible = state =>
  state.modals.isPaymentModalVisible;
  export const selectIsCreditModalVisible = state =>
  state.modals.isCreditModalVisible;
export default modalSlice.reducer;
