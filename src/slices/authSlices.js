import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  signIn: null,
 
  
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.signIn = action.payload;
    },
   
  },
});

export const {setSignIn} = authSlice.actions;

export const selectSignIn = state => state.auth.signIn;


export default authSlice.reducer;


