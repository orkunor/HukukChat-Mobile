import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chatHistory: [],
  sessionToken: "",


 
  
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
   
  },
});

export const {setLoading,setChatHistory,setSessionToken} = chatSlice.actions;

export const selectLoading = state => state.chat.loading;
export const selectChatHistory = state => state.chat.chatHistory;
export const selectSessionToken = state => state.chat.sessionToken;


export default chatSlice.reducer;


