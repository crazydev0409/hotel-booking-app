import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import {isLoggedInAtom, userAtom} from './store';
import {useAtom} from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './components/Loading';
const RootNavigator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        setUser(JSON.parse(data));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (!isLoggedIn) {
    return <AppStack />;
  } else {
    return <AuthStack />;
  }
};

export default RootNavigator;
