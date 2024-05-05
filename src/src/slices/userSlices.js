import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  email:null,
  phone:null
 
  
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
   
  },
});

export const {setUserName} = userSlice.actions;

export const selectUserName = state => state.user.userName;


export default userSlice.reducer;


