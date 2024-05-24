import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '.';
import {View, Text, Pressable, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../tailwindcss';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {http} from '../../helpers/http';
import {useAtom} from 'jotai';
import {userAtom} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthStack_OTPScreen'>;

const AuthStack_OTPScreen: React.FC<Props> = ({navigation, route}) => {
  const [user, setUser] = useAtom(userAtom);
  const [code, setCode] = useState('');
  const [confirmResult, setConfirmResult] =
    useState<FirebaseAuthTypes.ConfirmationResult>(null);

  useEffect(() => {
    if (route.params?.confirmResult) {
      setConfirmResult(route.params.confirmResult);
    }
  }, [route.params.confirmResult]);
  const onPressConfirmCode = () => {
    confirmResult
      .confirm(code)
      .then(user => {
        const data = {
          phone: route.params.phoneNumber,
        };
        http.post('/user/signup', data).then(res => {
          setUser(res.data);
          AsyncStorage.setItem('user', JSON.stringify(res.data));
          navigation.navigate('AppStack', {screen: 'AppStack_ProfileScreen'});
        });
      })
      .catch(error => {
        alert(error.message);
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
        Verification Code
      </Text>
      <View style={tw`flex-row w-full justify-center`}>
        <View
          style={tw`flex-row items-center h-15 w-3/4 bg-white rounded-lg mt-10`}>
          <TextInput
            style={tw`bg-white rounded-lg flex-1 font-dm font-bold text-[18px] text-center`}
            value={code}
            placeholder="Phone Number?"
            onChangeText={setCode}
          />
        </View>
      </View>
      <Text style={tw`text-center mt-3 text-black text-xs font-bold`}>
        Please enter your code here to verify
      </Text>
      <View style={tw`absolute bottom-0 w-full`}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressConfirmCode}
          style={tw`h-20 shrink-0 rounded-t-5 bg-white flex-row justify-end items-center`}>
          <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
            <Text style={tw`text-white text-[18px] font-dm font-bold`}>
              Done
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AuthStack_OTPScreen;
