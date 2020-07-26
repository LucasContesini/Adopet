/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import colors from './config/color';
import './config/ReactoToTronConfig';

import { store, persistor } from './store';

import App from './App';


export default function Index() {

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}