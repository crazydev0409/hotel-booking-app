import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack_HomePageScreen from './AppStack_HomePageScreen';

export type AppStackParamList = {
  AppStack_HomePageScreen: undefined;
};
const Stack = createStackNavigator<AppStackParamList>();
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppStack_HomePageScreen">
      <Stack.Screen
        name="AppStack_HomePageScreen"
        component={AppStack_HomePageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
