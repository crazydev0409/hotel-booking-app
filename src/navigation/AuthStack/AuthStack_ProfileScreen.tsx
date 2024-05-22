import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import {Cancel, Cross} from '../../lib/images';
import {AuthStackParamList} from '.';
import countries from '../../lib/countryCode';
import {SvgUri} from 'react-native-svg';
import {http} from '../../helpers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAtom} from 'jotai';
import {isLoggedInAtom} from '../../store';
type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_ProfileScreen'
>;

const AuthStack_ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [_, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState(countries[0].code);
  useEffect(() => {
    if (route.params) {
      setPhone(route.params.phoneNumber);
      setCountryCode(route.params.countryCode);
    }
  }, [route.params]);
  const onPressToCall = () => {
    Linking.openURL(`tel:+8801711234567`);
  };
  const saveProfile = () => {
    if (name.trim() === '') {
      alert('Name is required');
      return;
    }
    if (email.trim() === '') {
      alert('Email is required');
      return;
    }
    if (phone.trim() === '') {
      alert('Phone is required');
      return;
    }
    if (password.trim() === '') {
      alert('Password is required');
      return;
    }
    if (password.trim().length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    const country = countries.find(c => c.code === countryCode).name;
    const data = {
      name,
      email,
      phone,
      password,
      country,
    };
    http.post('/user/create', data).then(res => {
      if (res.data._id) {
        AsyncStorage.setItem('user', JSON.stringify(res.data));
        setIsLoggedIn(true);
      }
    });
  };
  return (
    <LinearGradient
      colors={['#FFF', '#1BF2DD']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={tw`flex-1 relative`}>
      <View style={tw`mt-5 ml-5 mb-10 flex-row items-center`}>
        <Image source={Cancel} style={tw`w-[38px] h-[38px]`} />
        <View style={tw`absolute top-[10px] left-[10px] w-full`}>
          <Image source={Cross} style={tw`w-[18px] h-[18px] z-50`} />
        </View>
        <Text style={tw`font-abril text-black text-[18px] ml-5`}>Profile</Text>
      </View>
      <View style={tw`mx-3`}>
        <TextInput
          style={tw`bg-white rounded-[13px] w-full h-17.5 self-center mb-7 text-center font-dm font-normal text-[14px] font-bold tracking-[0.5px]`}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={'#000'}
        />
        <TextInput
          style={tw`bg-white rounded-[13px] w-full h-17.5 self-center mb-7 text-center font-dm font-normal text-[14px] font-bold tracking-[0.5px]`}
          value={email}
          textContentType="emailAddress"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={'#000'}
        />
        <View style={tw`flex-row w-full justify-center mb-7`}>
          <View
            style={tw`flex-row items-center h-17.5 w-full bg-white rounded-[13px]`}>
            <SvgUri
              width={150}
              height={30}
              uri={`http://10.0.2.2:8081/assets/svg/${countryCode}.svg`}
            />
            <TextInput
              style={tw`bg-white rounded-lg flex-1 font-dm font-bold text-[14px] `}
              value={phone}
              placeholder="Phone Number?"
              placeholderTextColor={'#000'}
              onChangeText={setPhone}
            />
          </View>
        </View>
        <TextInput
          style={tw`bg-white rounded-[13px] w-full h-17.5 self-center mb-7 text-center font-dm font-normal text-[14px] font-bold tracking-[0.5px]`}
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Tab To Set Password"
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={tw`absolute bottom-0 w-full`}>
        <View
          style={tw`h-20 shrink-0 rounded-t-5 bg-white flex-row justify-between items-center`}>
          <View style={tw`ml-5`}>
            <Text style={tw`text-black font-dm text-[16px] font-bold`}>
              Customer Service
            </Text>
            <Text style={tw`text-[#93999A] font-dm text-[12px] font-normal`}>
              +8801711234567
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.3} onPress={saveProfile}>
            <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
              <Text style={tw`text-white text-[18px] font-dm font-bold`}>
                Call
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AuthStack_ProfileScreen;
