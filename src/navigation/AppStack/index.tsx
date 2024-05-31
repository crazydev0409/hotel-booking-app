import React from 'react';
import AppStack_HomePageScreen from './AppStack_HomePageScreen';
import AppStack_DetailScreen from './AppStack_DetailScreen';
import AppStack_ProfileScreen from './AppStack_ProfileScreen';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from 'RootNavigator';
import AuthStack from '../../navigation/AuthStack';
import AppStack_HotelSearch from './Appstack_HotelSearch';
import AppStack_PriceFilterScreen from './AppStack_PriceFilterScreen';
export type AppStackParamList = {
  AppStack_HomePageScreen: undefined;
  AppStack_DetailScreen: undefined;
  AppStack_HotelSearch: undefined;
  AppStack_LocationSearch: undefined;
  AppStack_PriceFilterScreen: undefined;
  AppStack_ProfileScreen: {
    countryCode: string;
  };
  AuthStack: {
    screen?: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AppStack'>;
const Stack = createNativeStackNavigator<AppStackParamList>();
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
        name="AppStack_HotelSearch"
        component={AppStack_HotelSearch}
        options={{headerShown: false, animation: 'ios'}}
      />
      <Stack.Screen
        name="AppStack_PriceFilterScreen"
        component={AppStack_PriceFilterScreen}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
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
