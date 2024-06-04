import React, {useState} from 'react';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import Loading from './components/Loading';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type RootStackParamList = {
  AuthStack: {
    screen?: string;
  };
  AppStack: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
