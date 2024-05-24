import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import {isLoggedInAtom, userAtom} from './store';
import {useAtom} from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './components/Loading';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type RootStackParamList = {
  AuthStack: undefined;
  AppStack: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);
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
