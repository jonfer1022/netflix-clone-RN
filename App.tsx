import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import MainRender from './src';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MainRender />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
