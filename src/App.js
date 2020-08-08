import React from 'react';
import createRouter from './routes';
import NavigationService from './services/navigation';
import { useSelector } from 'react-redux';

console.disableYellowBox = true;

export default function App() {
  const firstAccess = useSelector(state => state.commons.firstAccess);
  const Routes = createRouter(firstAccess);
  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}