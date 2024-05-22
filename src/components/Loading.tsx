import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import tw from '../../tailwindcss';

const Loading = ({backgroundColor = ''}: {backgroundColor?: string}) => (
  <View style={[tw`flex-1 items-center justify-center`, {backgroundColor}]}>
    <ActivityIndicator />
  </View>
);

export default Loading;
