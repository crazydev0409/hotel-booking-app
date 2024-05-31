import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from '../../tailwindcss';
import {Cancel, Cross} from '../lib/images';
const DecreaseIcon = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
      style={tw`${disabled ? 'opacity-50' : ''}`}>
      <Image source={Cancel} style={tw`w-[18px] h-[18px]`} />
      <View style={tw`absolute -top-[1.5px] left-[6px] w-full`}>
        <Text style={tw`text-white font-bold text-[14px]`}>-</Text>
      </View>
    </TouchableOpacity>
  );
};

const IncreaseIcon = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Image source={Cancel} style={tw`w-[18px] h-[18px]`} />
      <View style={tw`absolute -top-[1px] left-[5px] w-full`}>
        <Text style={tw`text-white font-bold text-[14px]`}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export {IncreaseIcon, DecreaseIcon};
