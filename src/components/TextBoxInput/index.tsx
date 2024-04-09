/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {LockIcon, UnLockIcon} from '../../icons';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onChangeVisibility?: (value: boolean) => void;
  visibility?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  icon?: JSX.Element;
}

const TextBoxInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  onChangeVisibility,
  visibility,
  icon,
}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          style={{color: 'white', fontSize: 20}}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : secureTextEntry ? (
        <Pressable
          onPress={() =>
            onChangeVisibility ? onChangeVisibility(!visibility) : null
          }
          style={styles.iconContainer}>
          <LockIcon />
        </Pressable>
      ) : (
        <Pressable
          onPress={() =>
            onChangeVisibility ? onChangeVisibility(!visibility) : null
          }
          style={styles.iconContainer}>
          <UnLockIcon />
        </Pressable>
      )}
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
});

export default TextBoxInput;
