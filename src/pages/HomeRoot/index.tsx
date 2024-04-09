/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeRootStackList} from '../../types/navigation';
import {Pressable, View} from 'react-native';
import {Home, ContentSelected, SearchContent, PlayVideo} from '../';
import {HomeIcon, SearchIcon} from '../../icons';

const BottomTab = createBottomTabNavigator<HomeRootStackList>();

const MyTabBarIcon = ({state, navigation}: BottomTabBarProps) => {
  const routes = state.routes;

  const choseIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <HomeIcon />;
      case 'SearchContent':
        return <SearchIcon />;
    }
  };

  return !['PlayVideo'].includes(routes[state.index].name) ? (
    <View
      style={{
        backgroundColor: '#121212',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {routes?.map(route =>
        !['ContentSelected', 'PlayVideo'].includes(route.name) ? (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              padding: 5,
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {choseIcon(route.name)}
          </Pressable>
        ) : null,
      )}
    </View>
  ) : null;
};

const HomeRoot = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <MyTabBarIcon {...props} />}
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          borderWidth: 2,
          borderTopWidth: 2,
          height: 60,
          paddingBottom: 0,
        },
        // tabBarIcon: (props) => <MyTabBarIcon {...props}/>,
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="ContentSelected" component={ContentSelected} />
      <BottomTab.Screen name="SearchContent" component={SearchContent} />
      <BottomTab.Screen name="PlayVideo" component={PlayVideo} />
    </BottomTab.Navigator>
  );
};

export default HomeRoot;
