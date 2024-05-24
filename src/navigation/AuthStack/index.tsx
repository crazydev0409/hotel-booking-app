import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import AuthStack_SignupScreen from './AuthStack_SignupScreen';
import AuthStack_ProfileScreen from '../AppStack/AppStack_ProfileScreen';
import AuthStack_CountryScreen from './AuthStack_CountryScreen';
import AuthStack_OTPScreen from './AuthStack_OTPScreen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'RootNavigator';

export type AuthStackParamList = {
  AppStack: {
    screen?: string;
  };
  AuthStack_SignupScreen: {
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

type Props = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;
const Stack = createStackNavigator<AuthStackParamList>();
const AuthStack: React.FC<Props> = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="AuthStack_SignupScreen">
      <Stack.Screen
        name="AuthStack_SignupScreen"
        component={AuthStack_SignupScreen}
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
