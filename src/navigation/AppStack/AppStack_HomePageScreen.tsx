import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '.';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import tw from '../../../tailwindcss';
import Animated from 'react-native-reanimated';
type Props = NativeStackScreenProps<
  AppStackParamList,
  'AppStack_HomePageScreen'
>;

const AppStack_HomePageScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={tw`flex-1`}>
      <MapView
        style={tw`h-full w-full`}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="xxx hotel"
          description="This is a hotel">
          <View
            style={tw`w-7 h-4 rounded-[3px] bg-[#1E2761] flex-row justify-center items-center`}>
            <Text
              style={tw`text-white text-[8px] text-center font-dm font-bold`}>
              $100
            </Text>
          </View>
        </Marker>
      </MapView>
      <Animated.View style={tw`absolute bottom-0 left-0 right-0 bg-white p-4`}>
        <Text style={tw`text-lg font-dm font-bold`}>xxx hotel</Text>
        <Text style={tw`text-sm font-dm`}>This is a hotel</Text>
        <Text style={tw`text-sm font-dm`}>$100</Text>
      </Animated.View>
    </View>
  );
};

export default AppStack_HomePageScreen;
