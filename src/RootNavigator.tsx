import React from 'react';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const RootNavigator = () => {
  if (1 === 1) {
    return <AuthStack />;
  } else {
    return <AppStack />;
  }
};

export default RootNavigator;
