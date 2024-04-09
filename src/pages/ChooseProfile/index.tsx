/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NetflixLogo, PlusIcon, UserIcon} from '../../icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import axios from 'axios';
import {rootPath} from '../../utils/constants/general';
import {IProfile} from '../../types/interfaces';
import {profilesAction} from '../../redux/reducer/profile.reducer';

interface Response {
  data: {
    result: [IProfile];
  };
}

const ChooseProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {currentToken: token} = useAppSelector(state => state.tokens);
  const [profiles, setProfiles] = useState<IProfile[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const {data}: Response = await axios.get(`${rootPath}dev/profiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (typeof data !== 'undefined') {
          setProfiles(data.result);
        }
      })();
    }, [token]),
  );

  const addNewProfile = () => {
    navigation.navigate({
      name: 'AddNewProfile',
    } as never);
  };

  const selectProfile = (profile: IProfile) => {
    dispatch(profilesAction.setProfile(profile));
    navigation.navigate({
      name: 'HomeRoot',
    } as never);
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
      <View style={styles.contentProfile}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
            paddingBottom: 20,
          }}>
          Who's watching?
        </Text>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {profiles?.map(item => (
            <Pressable
              onPress={() => selectProfile(item)}
              style={{
                width: '50%',
                height: 200,
                padding: 20,
              }}
              key={`profile-${item.id}`}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#595353',
                }}>
                <UserIcon size="100" />
                <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                  {item.profileName ?? ''}
                </Text>
              </View>
            </Pressable>
          ))}
          <Pressable
            onPress={() => addNewProfile()}
            style={{
              width: '50%',
              height: 200,
              padding: 20,
            }}>
            <View
              style={{
                borderStyle: 'dashed',
                borderColor: '#595353',
                borderWidth: 3,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <PlusIcon size="80" />
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Add profile
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  contentProfile: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default ChooseProfile;
