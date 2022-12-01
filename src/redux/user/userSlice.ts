import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './userTypes';

export const initialState: { user: UserType } = {
  user: {
    id: '',
    name: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
