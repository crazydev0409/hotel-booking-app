import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="App" component={View} />
    </Stack.Navigator>
  );
};

export default AppStack;
