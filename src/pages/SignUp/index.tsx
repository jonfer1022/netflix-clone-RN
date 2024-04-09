/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PhoneInput, TextBoxInput} from '../../components';
import CheckBox from '@react-native-community/checkbox';
import {PhoneIcon, UserIcon} from '../../icons';
import {rootPath} from '../../utils/constants/general';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [checkConditions, setCheckConditions] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const disableNext = !(
    checkConditions &&
    Boolean(name.length) &&
    Boolean(phone.length) &&
    Boolean(password.length)
  );

  const submitSignUp = () => {
    (async () => {
      const res = await axios.post(`${rootPath}dev/sign-up`, {
        phone: `+61${phone}`,
        password,
        fullName: name,
      });

      if (typeof res !== 'undefined') {
        navigation.navigate({
          name: 'ConfirmSignUp',
          params: {password, phone},
        } as never);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formSignUp}>
        <View
          style={[
            {
              flex: 6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 20,
            },
          ]}>
          <Text style={{color: 'white', fontSize: 40, fontWeight: '700'}}>
            Get Started
          </Text>
        </View>
        <View
          style={[{flex: 2, justifyContent: 'center', paddingHorizontal: 10}]}>
          <PhoneInput
            placeholder="Phone"
            icon={<PhoneIcon />}
            value={phone}
            onChangeText={setPhone}
            keyboardType="decimal-pad"
          />
        </View>
        <View
          style={[{flex: 2, justifyContent: 'center', paddingHorizontal: 10}]}>
          <TextBoxInput
            placeholder="Full Name"
            icon={<UserIcon />}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View
          style={[{flex: 2, justifyContent: 'center', paddingHorizontal: 10}]}>
          <TextBoxInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isVisible}
            visibility={isVisible}
            onChangeVisibility={setIsVisible}
          />
        </View>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <CheckBox
            boxType={'square'}
            value={checkConditions}
            onValueChange={newValue => setCheckConditions(newValue)}
          />
          <Text style={{color: 'white', fontSize: 13}}>
            By checking the box you agree to our Terms and Conditions.
          </Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: 15,
          }}>
          <Text style={{color: 'white'}}>Already a member? </Text>
          <Link to={{screen: 'SignIn'}} style={{color: '#FF3951'}}>
            Log In
          </Link>
        </View>
        <Pressable onPress={() => submitSignUp()} disabled={disableNext}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.buttonNext,
                {backgroundColor: disableNext ? '#433C3C' : '#D22F26'},
              ]}>
              <Text style={styles.txtButtonNext}>Next</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formSignUp: {
    flex: 7,
  },
  containerBottom: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
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
  border: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default SignUp;
