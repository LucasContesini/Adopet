import React from 'react';
import createRouter from './routes';
import NavigationService from './services/navigation';

console.ignoredYellowBox = true;
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