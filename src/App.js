import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';
import NavigationService from './services/navigation';

console.disableYellowBox = true;

export default function App() {
  const signed = useSelector(state => state.auth.token);
  const Routes = createRouter(signed);
  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}