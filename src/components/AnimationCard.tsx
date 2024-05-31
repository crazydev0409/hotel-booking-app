import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Pressable, Text} from 'react-native';
import tw from '../../tailwindcss';

type Props = {
  children: React.ReactNode;
  open: boolean;
  title: string;
  smallTitle: string;
  value: string;
  onPress: () => void;
  cardHeight?: number;
};
const AnimationCard: React.FC<Props> = ({
  children,
  open,
  title,
  smallTitle,
  value,
  onPress,
  cardHeight = Dimensions.get('window').height / 2.5,
}) => {
  const height = useRef(new Animated.Value(64)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const height1 = fadeAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 64],
  });
  const height2 = fadeAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  Animated.timing(height, {
    toValue: open ? cardHeight : 64,
    duration: 200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: open ? 1 : 0,
    duration: 100,
    useNativeDriver: false,
  }).start();

  Animated.timing(fadeAnim1, {
    toValue: open ? 0 : 1,
    duration: 200,
    useNativeDriver: false,
  }).start();

  Animated.timing(fadeAnim2, {
    toValue: open ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();

  return (
    <Animated.View style={{...tw`w-full rounded-[13px] bg-white mb-7`, height}}>
      <Pressable onPress={onPress}>
        <Animated.View
          style={{
            ...tw`w-full rounded-[13px] bg-white mb-7 flex flex-row justify-between items-center`,
            opacity: fadeAnim1,
            height: height1,
          }}>
          <Text
            style={tw`ml-6 mb-0 font-dm text-black text-[14px] font-bold font-dm h-4.5`}>
            {smallTitle}
          </Text>
          <Text
            style={tw`mr-6 mb-0 font-dm text-black text-[14px] font-bold font-dm h-4.5`}>
            {value}
          </Text>
        </Animated.View>
      </Pressable>
      <Animated.Text
        style={{
          ...tw`ml-6 mb-7 font-abril text-black text-[18px] font-bold`,
          opacity: fadeAnim2,
          height: height2,
        }}>
        {title}
      </Animated.Text>
      <Animated.View style={{opacity}}>{children}</Animated.View>
    </Animated.View>
  );
};

export default AnimationCard;
