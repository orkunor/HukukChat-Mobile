import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chatHistory: [],
  sessionToken: "",
  warningText:"",
  warningButtonText:"",
  webSearchEnabled: false,


 
  
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
    setWarningButtonText: (state, action) => {
      state.warningButtonText = action.payload;
    },
    setWarningText: (state, action) => {
      state.warningText = action.payload;
    },
    setWebSearchEnable: (state, action) => {
      state.webSearchEnabled = action.payload;
    },
    
  },
});

export const {setLoading,setChatHistory,setSessionToken,setWarningButtonText,setWarningText,setWebSearchEnable} = chatSlice.actions;

export const selectLoading = state => state.chat.loading;
export const selectChatHistory = state => state.chat.chatHistory;
export const selectSessionToken = state => state.chat.sessionToken;
export const selectWarningButtonText = state => state.chat.warningButtonText;
export const selectWarningText = state => state.chat.warningText;
export const selectWebSearchEnabled = state => state.chat.webSearchEnabled;


export default chatSlice.reducer;


