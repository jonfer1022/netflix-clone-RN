/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NetflixLogo, PhoneIcon} from '../../icons';
import {PhoneInput, TextBoxInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {tokenAction} from '../../redux/reducer/token.reducer';
import {useAppDispatch} from '../../redux/hooks';
import {rootPath} from '../../utils/constants/general';

interface Response {
  data: {
    AccessToken: string;
    RefreshToken: string;
  };
}

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const disableBtn = !(Boolean(phone.length) && Boolean(password.length));

  const submitLogin = () => {
    (async () => {
      try {
        const {data}: Response = await axios.post(`${rootPath}dev/sign-in`, {
          phone: `+61${phone}`,
          password,
        });
        dispatch(tokenAction.setToken(data.AccessToken));
        dispatch(tokenAction.setRefresh(data.RefreshToken));
        navigation.navigate('ChooseProfile' as never);
      } catch (error) {
        console.log('-----> ~ error:', error);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NetflixLogo />
      </View>
      <View
        style={[
          {justifyContent: 'center', paddingHorizontal: 10, marginTop: 100},
        ]}>
        <PhoneInput
          placeholder="Phone Number"
          icon={<PhoneIcon />}
          value={phone}
          onChangeText={setPhone}
          keyboardType="decimal-pad"
        />
      </View>
      <View
        style={[
          {justifyContent: 'center', paddingHorizontal: 10, marginTop: 10},
        ]}>
        <TextBoxInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isVisible}
          visibility={isVisible}
          onChangeVisibility={setIsVisible}
        />
      </View>
      <Pressable onPress={() => submitLogin()} disabled={disableBtn}>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          <View
            style={[
              styles.buttonNext,
              {backgroundColor: disableBtn ? '#433C3C' : '#D22F26'},
            ]}>
            <Text style={styles.txtButtonNext}>Sign In</Text>
          </View>
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <Text style={{color: 'white'}}>New to Netflix? </Text>
        <Text
          style={{color: '#FF3951'}}
          onPress={() => navigation.navigate('SignUp' as never)}>
          Sign Up now
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  buttonNext: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#D22F26',
    borderRadius: 5,
  },
  txtButtonNext: {
    paddingVertical: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignIn;
