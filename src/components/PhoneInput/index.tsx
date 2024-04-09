/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import {AuFlag} from '../../icons';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  icon: JSX.Element;
}

const PhoneInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  icon,
}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flagContainer}>
        <AuFlag />
        <Text style={{color: 'white', fontSize: 20, marginLeft: 8}}>+61</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          style={{color: 'white', fontSize: 20}}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
        />
      </View>
      <View style={styles.iconContainer}>{icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#595353',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  inputContainer: {
    flex: 8,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagContainer: {
    flexDirection: 'row',
    marginRight: 8,
    borderRightWidth: 2,
    borderRightColor: '#b8b8b8',
    paddingRight: 8,
    // borderColor: 'red',
    // borderWidth: 2,
  },
});

export default PhoneInput;
