/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
// import axios from 'axios';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {
  DownloadIcon,
  HeartIcon,
  PlayCircleIcon,
  PlusIcon,
  ShareIcon,
} from '../../icons';
import {HomeRootStackList} from '../../types/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

const mockEpisodes = [
  {
    id: '1',
    name: 'Episode 1',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
  {
    id: '2',
    name: 'Episode 2',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
  {
    id: '3',
    name: 'Episode 3',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
  {
    id: '4',
    name: 'Episode 4',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
  {
    id: '5',
    name: 'Episode 5',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
  {
    id: '6',
    name: 'Episode 6',
    link: 'https://www.w3schools.com/html/mov_bbb.mp4',
    linkCover: 'https://picsum.photos/200/300',
    classification: 'PG',
    updated_at: '2021-12-01T00:00:00.000Z',
    description: 'description',
  },
];

const ContentSelected = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeRootStackList, 'ContentSelected'>>();
  const [episodes] = useState(mockEpisodes);
  // const {name, classification, updated_at, description, linkCover} =
  const {name, classification, updated_at, description} = route.params.item;
  const year = new Date(updated_at).getFullYear();

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View
          style={{
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            // source={{uri: linkCover}}
            source={{uri: 'https://picsum.photos/200/300'}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 5,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
            {name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', fontSize: 14}}>{year} </Text>
            <Text style={{color: 'white', fontSize: 14}}>{classification}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => console.log('VER!!')}
          style={styles.buttonPlay}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
            Play
          </Text>
        </Pressable>
        <Text style={{color: 'white', fontSize: 14}}>{description}</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-around',
          }}>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <PlusIcon size="30" />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 5,
              }}>
              My list
            </Text>
          </Pressable>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <HeartIcon size="30" />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 5,
              }}>
              Like
            </Text>
          </Pressable>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <ShareIcon size="31" />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 5,
              }}>
              Share
            </Text>
          </Pressable>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <DownloadIcon size="30" />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 5,
              }}>
              Download
            </Text>
          </Pressable>
        </View>
        <View>
          {episodes?.map((episode, index) => (
            <View
              key={`episode-${index}-${episode.id}`}
              style={{
                height: 150,
                flexDirection: 'row',
                marginBottom: 15,
              }}>
              <Pressable
                onPress={() =>
                  navigation.navigate({
                    name: 'PlayVideo',
                    params: {
                      previousPage: 'ContentSelected',
                      item: route.params.item,
                    },
                  } as never)
                }
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '50%',
                    height: '100%',
                    alignItems: 'center',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    marginRight: 10,
                  }}>
                  <Image
                    source={{uri: episode.linkCover}}
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: 5,
                    }}
                  />
                  <View
                    style={{
                      width: 0,
                      left: -120,
                      zIndex: 1,
                    }}>
                    <PlayCircleIcon size={60} />
                  </View>
                </View>
                <Text style={{color: 'white', fontSize: 14}}>
                  {episode.name}
                </Text>
              </Pressable>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <DownloadIcon size="30" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  buttonPlay: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  txtButtonNext: {
    paddingVertical: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ContentSelected;
