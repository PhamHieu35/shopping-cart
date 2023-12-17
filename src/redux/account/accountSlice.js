import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticator: false,
  user: {
    email: '',
    phone: '',
    fullName: '',
    role: '',
    avatar: '',
    id: '',
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,

  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticator = true;
      state.user = action.payload;
    },

    doRefetchAction: (state, action) => {
      state.isAuthenticator = true;
      state.user = action.payload;
    },
  },
});

export const { doLoginAction, doRefetchAction } = accountSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default accountSlice.reducer;
