import React from 'react';
import {View, Text, Image, ScrollView, Pressable, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../tailwindcss';
import {Cancel, Cross, Mexico} from '../../lib/images';
import countries from '../../lib/countryCode';
import Svg, {Path, SvgUri} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '.';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_CountryScreen'
>;

const CountryCodeCard = ({flag, country, code, onPress}) => {
  return (
    <Pressable
      onPress={() => onPress(flag)}
      style={tw`flex-row items-center bg-white rounded-[13px] w-full h-17.5 mb-7 px-1 font-dm text-[14px] font-bold tracking-[0.5px]`}>
      <View style={tw`w-1/2 flex-row items-center`}>
        <View style={tw`h-7.5 w-15 ml-1.5 mr-5 rounded-[13px] overflow-hidden`}>
          <SvgUri
            width={60}
            height={30}
            uri={`http://10.0.2.2:8081/assets/svg/${flag}.svg`}
          />
        </View>
        {/* <Image source={flag} style={tw`w-15 h-7.5 ml-1.5 mr-5`} /> */}
        <Text style={tw`text-[#93999A] text-[14px] font-dm font-bold`}>
          {code}
        </Text>
      </View>
      <Text style={tw`text-black text-[14px] font-bold font-dm flex-shrink`}>
        {String(country).toUpperCase()}
      </Text>
    </Pressable>
  );
};
const AuthStack_CountryScreen: React.FC<Props> = ({navigation}) => {
  const onPressGoBack = () => {
    navigation.goBack();
  };
  const onPressCode = (flag: string) => {
    navigation.navigate('AuthStack_SigninScreen', {
      countryCode: flag,
    });
  };
  return (
    <LinearGradient
      colors={['#FFF', '#1BF2DD']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={tw`flex-1 relative`}>
      <ScrollView>
        <View style={tw`mt-5 ml-5 mb-10 flex-row items-center`}>
          <Pressable onPress={onPressGoBack}>
            <Image source={Cancel} style={tw`w-[38px] h-[38px]`} />
            <View style={tw`absolute top-[10px] left-[10px] w-full`}>
              <Image source={Cross} style={tw`w-[18px] h-[18px] z-50`} />
            </View>
          </Pressable>
          <Text style={tw`font-abril text-black text-[18px] ml-5`}>
            Country Code
          </Text>
        </View>
        <View style={tw`mx-3`}>
          <FlatList
            data={countries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: {name, dial_code, code}}) => (
              <CountryCodeCard
                flag={code}
                country={name}
                code={dial_code}
                onPress={onPressCode}
              />
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AuthStack_CountryScreen;
