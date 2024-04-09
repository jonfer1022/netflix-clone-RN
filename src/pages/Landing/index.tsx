/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NetflixLogo} from '../../icons';

const Landing = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NetflixLogo />
        </View>
        <View
          style={{
            flex: 2,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 20,
          }}>
          <Pressable onPress={() => navigation.navigate('SignUp' as never)}>
            <View style={styles.buttonSignUp}>
              <Text style={{color: 'white'}}>Sign Up</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerTxt}>
        <Text style={styles.txtInfo1}>
          Unlimited movies, TV shows, and more.
        </Text>
        <Text style={styles.txtInfo2}>
          Watch anywhere. Cancel anytime. Tap the link below to sign in.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 2,
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => navigation.navigate('SignIn' as never)}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.buttonSignIn}>
              <Text style={styles.txtButtonSignIn}>Log In</Text>
            </View>
          </View>
        </Pressable>
      </View>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTxt: {
    flex: 4,
    borderWidth: 2,
    justifyContent: 'flex-end',
    paddingBottom: 200,
    paddingHorizontal: 30,
  },
  txtInfo1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
  },
  txtInfo2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  buttonSignUp: {
    flexDirection: 'row',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#433C3C',
  },
  buttonSignIn: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#D22F26',
    borderRadius: 5,
  },
  txtButtonSignIn: {
    paddingVertical: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Landing;
