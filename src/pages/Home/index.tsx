/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useMemo, useEffect, useCallback} from 'react';
import {rootPath} from '../../utils/constants/general';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowRecord, InfoIcon, NetflixSmallLogo, PlusIcon} from '../../icons';
import Carousel from 'react-native-reanimated-carousel';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import {IContent, IMovies, ISeries} from '../../types/interfaces';

interface Response {
  data: {
    result: IContent;
  };
}

const Home = () => {
  const navigation = useNavigation();
  const isAndroid = useMemo(() => Platform.OS === 'android', []);
  const width = Dimensions.get('window').width;
  const {currentToken: token} = useAppSelector(state => state.tokens);
  const [firstMovie, setFirstMovie] = useState<IMovies>();
  const [comedy, setComedy] = useState<ISeries[] | IMovies[]>([]);
  const [drama, setDrama] = useState<ISeries[] | IMovies[]>([]);
  const [action, setAction] = useState<ISeries[] | IMovies[]>([]);
  const [scifi, setScifi] = useState<ISeries[] | IMovies[]>([]);
  const [romantic, setRomantic] = useState<ISeries[] | IMovies[]>([]);
  const [terror, setTerror] = useState<ISeries[] | IMovies[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const {data}: Response = await axios.get(`${rootPath}dev/content`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (typeof data !== 'undefined') {
          setComedy(data.result.comedy);
          setDrama(data.result.drama);
          setAction(data.result.action);
          setScifi(data.result.scifi);
          setRomantic(data.result.romantic);
          setTerror(data.result.terror);
          setFirstMovie(data.result.movie);
        }
      })();
    }, [token]),
  );

  useEffect(() => {
    (async () => {
      const {data}: Response = await axios.get(`${rootPath}dev/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof data !== 'undefined') {
        setComedy(data.result.comedy);
        setDrama(data.result.drama);
        setAction(data.result.action);
        setScifi(data.result.scifi);
        setRomantic(data.result.romantic);
        setTerror(data.result.terror);
        setFirstMovie(data.result.movie);
      }
    })();
  }, [token]);

  return (
    <View style={[styles.root, {paddingHorizontal: isAndroid ? 5 : 0}]}>
      <ScrollView>
        {/* ---- FIRST VIDEO ----- */}
        <View
          style={[
            styles.border,
            {
              height: 500,
              overflow: 'hidden',
            },
          ]}>
          {firstMovie?.linkTrailer ? (
            <Video
              source={{uri: firstMovie?.linkTrailer}} // the video file
              paused={false} // make it start
              style={{height: 700}}
              repeat={true} // make it a loop
              resizeMode="stretch"
              muted={true}
            />
          ) : null}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0) 255, 255, 1)', '#000000']}
            style={styles.linearGradient}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <NetflixSmallLogo />
              <Pressable style={{padding: 10}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
                  Series
                </Text>
              </Pressable>
              <Pressable style={{padding: 10}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
                  Movies
                </Text>
              </Pressable>
              <Pressable style={{padding: 10}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
                  List
                </Text>
              </Pressable>
              <Pressable style={{padding: 10}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
                  Search
                </Text>
              </Pressable>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
                Title of the video
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
          }}>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <PlusIcon size="30" />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 3,
              }}>
              My list
            </Text>
          </Pressable>
          <Pressable style={{padding: 15}}>
            <View
              style={[
                styles.buttonNext,
                // {backgroundColor: disableBtn ? '#433C3C' : '#D22F26'},
              ]}>
              <ArrowRecord />
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  marginLeft: 10,
                }}>
                Play
              </Text>
            </View>
          </Pressable>
          <Pressable style={{padding: 10, alignItems: 'center'}}>
            <InfoIcon size={30} />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 3,
              }}>
              Info
            </Text>
          </Pressable>
        </View>
        {/* ---- FIRST VIDEO ----- */}
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Drama Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={drama}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate({
                    name: 'ContentSelected',
                    params: {item},
                  } as never)
                }
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/200/300' || item.linkCover,
                  }}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Comedy Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={comedy}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  // source={require('../../../multimedia/cover.jpeg')}
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'cover',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Romantic Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={romantic}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  // source={require('../../../multimedia/cover.jpeg')}
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Action Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={action}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  // source={require('../../../multimedia/cover.jpeg')}
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Sci-Fi Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={scifi}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  // source={require('../../../multimedia/cover.jpeg')}
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Terror Series
            </Text>
            <Pressable>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: '#433C3C',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: 14}}>See More</Text>
              </View>
            </Pressable>
          </View>
          <Carousel
            loop={true}
            style={{width: width}}
            width={width / 2.5}
            height={250}
            autoPlay={true}
            autoPlayInterval={3000}
            data={terror}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <Image
                  // source={require('../../../multimedia/cover.jpeg')}
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={{
                    width: 'auto',
                    height: 250,
                    resizeMode: 'stretch',
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentProfile: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  border: {
    borderColor: 'red',
    borderWidth: 0,
  },
  buttonNext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#D22F26',
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'center',
  },
  linearGradient: {
    height: 500,
    top: -700,
    paddingTop: 60,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
});

export default Home;
