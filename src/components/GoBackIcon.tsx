import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import tw from '../../tailwindcss';
import {Cancel, Cross} from '../lib/images';
const GoBackIcon = ({navigation}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
      <Image source={Cancel} style={tw`w-[38px] h-[38px]`} />
      <View style={tw`absolute top-[10px] left-[10px] w-full`}>
        <Image source={Cross} style={tw`w-[18px] h-[18px] z-50`} />
      </View>
    </TouchableOpacity>
  );
};

export default GoBackIcon;
