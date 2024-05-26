import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack_HomePageScreen from './AppStack_HomePageScreen';
import AppStack_DetailScreen from './AppStack_DetailScreen';
import AppStack_ProfileScreen from './AppStack_ProfileScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'RootNavigator';
import AuthStack from '../../navigation/AuthStack';
export type AppStackParamList = {
  AppStack_HomePageScreen: undefined;
  AppStack_DetailScreen: undefined;
  AppStack_ProfileScreen: {
    countryCode: string;
  };
  AuthStack: {
    screen?: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AppStack'>;
const Stack = createStackNavigator<AppStackParamList>();
const AppStack: React.FC<Props> = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="AppStack_HomePageScreen">
      <Stack.Screen
        name="AppStack_HomePageScreen"
        component={AppStack_HomePageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppStack_DetailScreen"
        component={AppStack_DetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppStack_ProfileScreen"
        component={AppStack_ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
