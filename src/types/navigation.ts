import {NavigatorScreenParams} from '@react-navigation/native';
import {IMovies, ISeries} from './interfaces';

export type RootStackList = {
  AuthRoot: NavigatorScreenParams<AuthStackList>;
  // Auth: NavigatorScreenParams<AuthStackList>
  // LoginRoot: NavigatorScreenParams<LoginRootTabList>
  // Settings: NavigatorScreenParams<SettingsMenuList & AccountInfoList>
};

export type AuthStackList = {
  Landing: undefined;
  SignUp: undefined;
  ConfirmSignUp: {
    phone: string | null;
    password: string | null;
  };
  SignIn: undefined;
  ChooseProfile: undefined;
  AddNewProfile: undefined;
  HomeRoot: undefined;
};

export type HomeRootStackList = {
  Home: undefined;
  ContentSelected: {
    item: ISeries | IMovies;
  };
  SearchContent: undefined;
  PlayVideo: {
    previousPage: string;
    item: ISeries | IMovies;
  };
};
