import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '.';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../tailwindcss';
import {SvgUri} from 'react-native-svg';
import {useAtom} from 'jotai';
import {userAtom} from '../../store';
import countries from '../../lib/countryCode';
import {http} from '../../helpers/http';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_SigninScreen'
>;

const AuthStack_SigninScreen: React.FC<Props> = ({navigation, route}) => {
  const [user, setUser] = useAtom(userAtom);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const countryNumber = countries.find(
    country => country.code === countryCode,
  ).dial_code;

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setPasswordFocus(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setPasswordFocus(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    setPasswordRequired(route.params?.passwordRequired);
    // setCountryCode(route.params?.countryCode);
  }, [route.params]);
  const onPressCountry = () => {
    navigation.navigate('AuthStack_CountryScreen', {
      from: 'sign_in',
    });
  };

  const onPressSignIn = () => {
    if (phone.length === 0) {
      alert('Please Enter Phone Number');
      return;
    }
    if (passwordRequired && password.length === 0) {
      alert('Please Enter Password');
      return;
    }
    const data = {
      phone: `${countryNumber}${phone}`,
      password,
    };
    http.post('/user/login', data).then(res => {
      if (res.data.message === 'User does not exist') {
        alert('User does not exist');
      } else if (res.data.message === 'Password does not match') {
        alert('Password does not match');
      } else {
        setUser(res.data.data);
        navigation.navigate('AppStack', {screen: 'AppStack_HomePageScreen'});
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw`flex-grow`}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
      <LinearGradient
        colors={['#FFF', '#1BF2DD']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={tw`flex-1 relative`}>
        <Text
          style={tw`mt-50 mb-10 self-stretch text-center text-[32px] font-normal text-black font-medium font-abril`}>
          Welcome
        </Text>
        <View style={tw`flex flex-col w-full items-center`}>
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
          {passwordRequired && (
            <View
              style={tw`flex-row items-center h-15 w-3/4 bg-white rounded-lg mt-4.5`}>
              <TextInput
                style={tw`bg-white rounded-lg flex-1 font-dm font-bold text-[18px] text-center`}
                secureTextEntry={password.length === 0 && !passwordFocus}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
              />
            </View>
          )}
        </View>
        {!passwordFocus && (
          <View style={tw`absolute bottom-0 w-full`}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressSignIn}
              style={tw`h-20 rounded-t-5 bg-white flex-row justify-end items-center`}>
              <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
                <Text style={tw`text-white text-[18px] font-dm font-bold`}>
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AuthStack_SigninScreen;
