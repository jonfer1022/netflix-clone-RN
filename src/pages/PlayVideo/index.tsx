/* eslint-disable react-native/no-inline-styles */
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as React from 'react';
import {useState, useRef} from 'react';
import {View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {HomeRootStackList} from '../../types/navigation';

const PlayVideo = () => {
  const videoRef = useRef<VideoRef>(null);
  const route = useRoute<RouteProp<HomeRootStackList, 'PlayVideo'>>();
  const {previousPage} = route.params;
  const navigation = useNavigation();
  const [isPaused, setIsPaused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsPaused(false);
      console.log(videoRef?.current?.presentFullscreenPlayer());
      return () => {
        setIsPaused(true);
        console.log(videoRef?.current?.dismissFullscreenPlayer());
      };
    }, []),
  );

  const handleFullScreen = () => {
    navigation.navigate({
      name: previousPage,
      params: {
        item: route.params.item,
      },
    } as never);
  };

  return (
    <View style={{height: '100%'}}>
      <Video
        ref={videoRef}
        // source={require('../../../multimedia/pinguinsVideo.mp4')} // the video file
        source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}} // the video file
        style={{height: '100%'}}
        resizeMode="contain"
        paused={isPaused} // make it start
        repeat={true} // make it a loop
        muted={false}
        onFullscreenPlayerWillDismiss={() => {
          handleFullScreen();
        }}
        controls={true}
        fullscreenAutorotate={true}
        fullscreenOrientation="landscape"
      />
    </View>
  );
};

export default PlayVideo;
