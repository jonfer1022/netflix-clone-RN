/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TextBoxInput} from '../../components';
import {PlayCircleIcon, SearchIcon} from '../../icons';
import {useNavigation} from '@react-navigation/native';

const SearchContent = () => {
  const navigation = useNavigation();
  const [contentSearched] = useState([1, 2, 3, 4, 5, 6, 56, 76, 7, 65, 2]);
  const [text, setText] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log(text);
    }, 700);
    return () => clearTimeout(timeOutId);
  }, [text]);

  return (
    <SafeAreaView>
      <TextBoxInput
        icon={<SearchIcon />}
        onChangeText={e => setText(e)}
        placeholder={'Search content'}
        value={text}
      />
      <ScrollView style={{marginTop: 10}}>
        {contentSearched?.map((_, i) => (
          <View style={{height: 120, flexDirection: 'row'}} key={i}>
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: 'ContentSelected',
                  params: {
                    item: {
                      name: 'string',
                      productionCompany: 'string',
                      linkTrailer: 'string',
                      linkCover: 'string',
                      gender: ['string'],
                      classification: 'string',
                      description: 'string',
                    },
                  },
                } as never)
              }
              style={{
                flex: 5,
                height: 'auto',
                justifyContent: 'center',
              }}>
              <Image
                // source={require('../../../multimedia/pinguinsImg.jpeg')}
                source={{uri: 'https://picsum.photos/200/300'}}
                style={{
                  width: 'auto',
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: 'ContentSelected',
                  params: {
                    item: {
                      name: 'string',
                      productionCompany: 'string',
                      linkTrailer: 'string',
                      linkCover: 'string',
                      gender: ['string'],
                      classification: 'string',
                      description: 'string',
                    },
                  },
                } as never)
              }
              style={{
                flex: 7,
                height: 'auto',
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                Content's name
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: 'PlayVideo',
                  params: {previousPage: 'SearchContent'},
                } as never)
              }
              style={{
                flex: 1,
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <PlayCircleIcon />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchContent;
