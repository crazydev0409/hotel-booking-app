import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import AuthStack_SigninScreen from './AuthStack_SigninScreen';
import AuthStack_ProfileScreen from './AuthStack_ProfileScreen';
import AuthStack_CountryScreen from './AuthStack_CountryScreen';
import AuthStack_OTPScreen from './AuthStack_OTPScreen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type AuthStackParamList = {
  AuthStack_SigninScreen: {
    countryCode: string;
  };
  AuthStack_ProfileScreen: {
    phoneNumber: string;
    countryCode: string;
  };
  AuthStack_OTPScreen: {
    confirmResult: FirebaseAuthTypes.ConfirmationResult;
    phoneNumber: string;
    countryCode: string;
  };
  AuthStack_CountryScreen: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="AuthStack_SigninScreen">
      <Stack.Screen
        name="AuthStack_SigninScreen"
        component={AuthStack_SigninScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack_ProfileScreen"
        component={AuthStack_ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack_OTPScreen"
        component={AuthStack_OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack_CountryScreen"
        component={AuthStack_CountryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
