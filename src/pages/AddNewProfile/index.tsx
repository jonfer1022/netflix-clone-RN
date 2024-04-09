/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextBoxInput} from '../../components';
import {NetflixLogo, UserIcon} from '../../icons';
import {rootPath} from '../../utils/constants/general';
import axios from 'axios';
import {useAppSelector} from '../../redux/hooks';

const AddNewProfile = () => {
  const navigation = useNavigation();
  const {currentToken: token} = useAppSelector(state => state.tokens);
  const [name, setName] = useState('');
  const disableNext = !name.length;

  const submitSignUp = () => {
    (async () => {
      const res = await axios.post(
        `${rootPath}dev/profiles`,
        {
          fullName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (typeof res !== 'undefined') {
        navigation.navigate({
          name: 'ChooseProfile',
        } as never);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NetflixLogo />
      </View>
      <View style={styles.formSignUp}>
        <View
          style={[{flex: 2, justifyContent: 'center', paddingHorizontal: 10}]}>
          <TextBoxInput
            placeholder="Full Name"
            icon={<UserIcon />}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Pressable onPress={() => submitSignUp()} disabled={disableNext}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.buttonNext,
                {backgroundColor: disableNext ? '#433C3C' : '#D22F26'},
              ]}>
              <Text style={styles.txtButtonNext}>Add new profile</Text>
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

export default AddNewProfile;
