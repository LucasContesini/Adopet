import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.15.32' })
    .use(reactotronRedux())
    .setAsyncStorageHandler(AsyncStorage)
    .use(sagaPlugin())
    .useReactNative({
      errors: false,
    })
    .connect();

  tron.clear();

  console.tron = tron;
} else {
  console.tron = {};
  console.tron.log = message => {};
}