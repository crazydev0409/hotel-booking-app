import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../tailwindcss';
import {Cancel, Cross, Mexico} from '../../lib/images';
import countries from '../../lib/countryCode';
import Svg, {Path, SvgUri} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '.';
import GoBackIcon from '../../components/GoBackIcon';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_CountryScreen'
>;

const CountryCodeCard = ({flag, country, code, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(flag)} activeOpacity={0.5}>
      <View
        style={tw`flex-row items-center bg-white rounded-[13px] w-full h-17.5 mb-7 px-1 font-dm text-[14px] font-bold tracking-[0.5px]`}>
        <View style={tw`w-1/2 flex-row items-center`}>
          <View
            style={tw`h-7.5 w-15 ml-1.5 mr-5 rounded-[13px] overflow-hidden`}>
            <Image
              width={60}
              height={30}
              source={{
                uri: `https://flagcdn.com/w320/${flag.toLowerCase()}.png`,
              }}
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
      </View>
    </TouchableOpacity>
  );
};
const AuthStack_CountryScreen: React.FC<Props> = ({navigation, route}) => {
  const onPressGoBack = () => {
    navigation.goBack();
  };
  const onPressCode = (flag: string) => {
    if (route.params.from === 'sign_up') {
      navigation.navigate('AuthStack_SignupScreen', {
        countryCode: flag,
      });
    } else if (route.params.from === 'sign_in') {
      navigation.navigate('AuthStack_SigninScreen', {
        countryCode: flag,
      });
    } else if (route.params.from === 'profile') {
      navigation.navigate('AppStack', {
        screen: 'AppStack_ProfileScreen',
        params: {
          countryCode: flag,
        },
      });
    } else {
      navigation.navigate('AuthStack_SignupScreen', {
        countryCode: flag,
      });
    }
  };
  return (
    <LinearGradient
      colors={['#FFF', '#1BF2DD']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={tw`flex-1 relative`}>
      <ScrollView>
        <View style={tw`mt-5 ml-5 mb-10 flex-row items-center`}>
          <TouchableOpacity onPress={onPressGoBack} activeOpacity={0.5}>
            <View>
              <GoBackIcon onPress={() => navigation.goBack()} />
            </View>
          </TouchableOpacity>
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
