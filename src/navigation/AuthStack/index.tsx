import React, {useEffect} from 'react';
import AuthStack_SignupScreen from './AuthStack_SignupScreen';
import AuthStack_CountryScreen from './AuthStack_CountryScreen';
import AuthStack_SigninScreen from './AuthStack_SigninScreen';
import AuthStack_OTPScreen from './AuthStack_OTPScreen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from 'RootNavigator';
import AppStack from '../../navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type AuthStackParamList = {
  AppStack: {
    screen?: string;
  };
  AuthStack_SignupScreen: {
    countryCode: string;
  };
  AuthStack_SigninScreen: {
    countryCode: string;
    passwordRequired?: boolean;
  };
  AuthStack_OTPScreen: {
    confirmResult: FirebaseAuthTypes.ConfirmationResult;
    phoneNumber: string;
    countryCode: string;
    from?: string;
    type?: string;
    value?: string;
  };
  AuthStack_CountryScreen: {
    from: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;
const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack: React.FC<Props> = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="AuthStack_SignupScreen">
      <Stack.Screen
        name="AuthStack_SignupScreen"
        component={AuthStack_SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack_SigninScreen"
        component={AuthStack_SigninScreen}
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
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
