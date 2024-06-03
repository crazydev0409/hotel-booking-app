import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import auth, {firebase} from '@react-native-firebase/auth';
import {SvgUri} from 'react-native-svg';
import countries from '../../lib/countryCode';
import {AuthStackParamList} from '.';
import {http} from '../../helpers/http';
type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_SignupScreen'
>;
const flag = require('../../../assets/images/countries/mexico.png');
const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
const initialCode = 'US';
const AuthStack_SignupScreen: React.FC<Props> = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState(initialCode);
  const countryNumber = countries.find(
    country => country.code === countryCode,
  ).dial_code;
  const onPressSignUp = () => {
    const phoneNumber = `${countryNumber}${phone}`;
    if (!regexp.test(phoneNumber)) {
      alert('Please Enter Phone Number');
      return;
    }
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        navigation.navigate('AuthStack_OTPScreen', {
          confirmResult,
          phoneNumber,
          countryCode,
          from: 'sign_up',
        });
      })
      .catch(error => {
        alert(error.message);
      });
  };
  useEffect(() => {
    if (route.params?.countryCode) {
      setCountryCode(route.params.countryCode);
    }
  }, [route.params?.countryCode]);
  const onPressCountry = () => {
    navigation.navigate('AuthStack_CountryScreen', {
      from: 'sign_up',
    });
  };
  return (
    <LinearGradient
      colors={['#FFF', '#1BF2DD']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={tw`flex-1 relative`}>
      <Text
        style={tw`mt-50 mb-10 self-stretch text-center text-[32px] font-normal text-black font-medium font-abril`}>
        Welcome
      </Text>
      <View style={tw`flex-row w-full justify-center`}>
        <View
          style={tw`flex-row items-center h-15 w-3/4 bg-white rounded-lg mt-10`}>
          <TouchableOpacity onPress={onPressCountry} activeOpacity={0.5}>
            <Image
              width={60}
              height={30}
              source={{
                uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
              }}
              style={tw`mx-2.5`}
            />
          </TouchableOpacity>
          <Text style={tw`text-black text-[18px] font-dm font-bold`}>
            {countryNumber}
          </Text>
          <TextInput
            style={tw`bg-white rounded-lg flex-1 font-dm font-bold text-[18px] mt-0.7`}
            value={phone}
            placeholder="Phone Number?"
            onChangeText={setPhone}
          />
        </View>
      </View>
      <Text style={tw`text-center mt-3 text-black text-xs font-bold`}>
        We Need Phone Number For Your Profile
      </Text>
      <View style={tw`absolute bottom-0 w-full`}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressSignUp}
          style={tw`h-20 shrink-0 rounded-t-5 bg-white flex-row justify-end items-center`}>
          <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
            <Text style={tw`text-white text-[18px] font-dm font-bold`}>
              Start
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AuthStack_SignupScreen;
