import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import AuthStack_SigninScreen from './AuthStack_SigninScreen';
import AuthStack_ProfileScreen from './AuthStack_ProfileScreen';

const Stack = createStackNavigator();
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
    </Stack.Navigator>
  );
};

export default AuthStack;
