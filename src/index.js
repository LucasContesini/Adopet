/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect } from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import colors from './config/color';
import './config/ReactoToTronConfig';

import { store, persistor } from './store';

import App from './App';

console.ignoredYellowBox = true;
export default function Index() {
  useEffect(() => {
    console.ignoredYellowBox = true;
  }, []);
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}