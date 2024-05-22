import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import {Cancel, Cross} from '../../lib/images';
import {AuthStackParamList} from '.';
import countries from '../../lib/countryCode';
import {SvgUri} from 'react-native-svg';
type Props = NativeStackScreenProps<
  AuthStackParamList,
  'AuthStack_ProfileScreen'
>;

const AuthStack_ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState(countries[0].code);
  // useEffect(() => {
  //   if (route.params) {
  //     setPhone(route.params.phoneNumber);
  //     setCountryCode(route.params.countryCode);
  //   }
  // }, [route.params]);
  console.log({countryCode});
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
        <Pressable
          style={tw`h-20 shrink-0 rounded-t-5 bg-white flex-row justify-end items-center`}>
          <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
            <Text style={tw`text-white text-[18px] font-dm font-bold`}>
              Start
            </Text>
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default AuthStack_ProfileScreen;
