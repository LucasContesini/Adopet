import React from 'react';
import createRouter from './routes';
import NavigationService from './services/navigation';
import { useSelector } from 'react-redux';

console.disableYellowBox = true;

export default function App() {
  const token = useSelector(state => state.auth.token);
  const Routes = createRouter(token);
  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}