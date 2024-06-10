import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import RootNavigator from './RootNavigator';
const navigationRef = createNavigationContainerRef();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
