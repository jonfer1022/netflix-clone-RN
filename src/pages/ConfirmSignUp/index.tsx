/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rootPath} from '../../utils/constants/general';
import axios from 'axios';
import {AuthStackList} from '../../types/navigation';
import {useAppDispatch} from '../../redux/hooks';
import {tokenAction} from '../../redux/reducer/token.reducer';

interface Response {
  data: {
    AccessToken: string;
    RefreshToken: string;
  };
}

const ConfirmSignUp = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<AuthStackList, 'ConfirmSignUp'>>();
  const CELL_COUNT = 6;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submitConfirmSignUp = () => {
    (async () => {
      const {data}: Response = await axios.post(
        `${rootPath}dev/confirm-sign-up`,
        {
          phone: `+61${route.params.phone}`,
          code: value,
          password: route.params.password,
        },
      );

      if (typeof data !== 'undefined') {
        dispatch(tokenAction.setToken(data.AccessToken));
        dispatch(tokenAction.setRefresh(data.RefreshToken));
        navigation.navigate('ChooseProfile' as never);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Almost there</Text>
      <Text style={styles.textInfo}>
        Please enter the 6-digit code sent to your mobile number for
        verification.
      </Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Pressable
        onPress={() => submitConfirmSignUp()}
        disabled={value?.length < 6}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.buttonNext,
              {backgroundColor: value?.length < 6 ? '#433C3C' : '#D22F26'},
            ]}>
            <Text style={styles.txtButtonNext}>Next</Text>
          </View>
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <Text style={{color: 'white'}}>Didn’t receive any code? </Text>
        <Text
          style={{color: '#FF3951'}}
          onPress={() => navigation.navigate('Landing' as never)}>
          Resend again
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    marginBottom: 30,
  },
  codeFieldRoot: {marginTop: 20, marginBottom: 50},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#433C3C',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#433C3C',
  },
  textInfo: {
    color: 'white',
    fontSize: 14,
    marginBottom: 20,
  },
  focusCell: {
    borderColor: '#b83131',
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
});

export default ConfirmSignUp;
