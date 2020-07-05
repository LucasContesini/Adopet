import React from 'react';
import createRouter from './routes';
import NavigationService from './services/navigation';

console.disableYellowBox = true;

export default function App() {
  const Routes = createRouter();
  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}