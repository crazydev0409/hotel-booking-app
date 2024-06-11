import React, {useEffect, useState} from 'react';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import Loading from './components/Loading';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {isLoggedInAtom} from '../src/store';
import {useAtom} from 'jotai';
export type RootStackParamList = {
  AuthStack: {
    screen?: string;
  };
  AppStack: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isLoggedInAtom);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AsyncStorage.getItem('authStatus');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'AppStack' : 'AuthStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
