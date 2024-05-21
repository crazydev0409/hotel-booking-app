import React, {useState} from 'react';
import {View, Text, TextInput, Button, Pressable} from 'react-native';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import auth, {firebase} from '@react-native-firebase/auth';
const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;

const AuthStack_SigninScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(null);
  const onPressSignIn = () => {
    if (!regexp.test(phone)) {
      alert('Please Enter Phone Number');
      return;
    }
    auth()
      .signInWithPhoneNumber(phone)
      .then(confirmResult => {
        setConfirm(confirmResult);
        // navigation.navigate('AuthStack_OTPScreen', {
        //   confirmResult,
        //   phone,
        // });
      })
      .catch(error => {
        alert(error.message);
      });
    // navigation.navigate('AuthStack_ProfileScreen');
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
      <TextInput
        style={tw`bg-white rounded-lg w-3/4 self-center mt-10 text-center font-dm font-bold text-[18px]`}
        value={phone}
        placeholder="Phone Number?"
        onChangeText={setPhone}
      />
      <Text style={tw`text-center mt-3 text-black text-xs font-bold`}>
        We Need Phone Number For Your Profile
      </Text>
      <View style={tw`absolute bottom-0 w-full`}>
        <Pressable
          onPress={onPressSignIn}
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

export default AuthStack_SigninScreen;
