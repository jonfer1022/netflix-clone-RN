// Currently only store one single token, will expand in
// the future to accommodate multiple tokens

// import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IProfile} from '../../types/interfaces';

type TProfiles = {
  profile: IProfile | null;
};

const init: TProfiles = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState: init,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: () => init,
  },
});

export default profileSlice.reducer;
export const profilesAction = profileSlice.actions;
