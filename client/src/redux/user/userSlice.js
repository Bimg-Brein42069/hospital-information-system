import {createSlice} from '@reduxjs/toolkit';
  
const initialState = {
    jwt: null,
    currentUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authSuccess: (state, action) => {
            state.jwt = action.payload.jwt;
            state.currentUser = action.payload.user;
        },
        signOut: (state) => {
            state.jwt = null;
            state.currentUser = null;
        }
    }
});

export const {authSuccess, signOut} = userSlice.actions;
export default userSlice.reducer;
