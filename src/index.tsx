import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackList} from './types/navigation';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AddNewProfile,
  ChooseProfile,
  ConfirmSignUp,
  HomeRoot,
  Landing,
  SignIn,
  SignUp,
} from './pages';
import {useAppSelector} from './redux/hooks';

const Stack = createNativeStackNavigator<AuthStackList>();

function MainRender() {
  const {currentToken: token} = useAppSelector(state => state.tokens);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: 'rgb(10, 132, 255)',
            background: '#090808',
            card: 'rgb(18, 18, 18)',
            text: 'rgb(229, 229, 231)',
            border: 'rgb(39, 39, 41)',
            notification: 'rgb(255, 69, 58)',
          },
        }}>
        <Stack.Navigator
          initialRouteName={token?.length ? 'Landing' : 'Landing'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ChooseProfile" component={ChooseProfile} />
          <Stack.Screen name="AddNewProfile" component={AddNewProfile} />
          <Stack.Screen name="HomeRoot" component={HomeRoot} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainRender;
