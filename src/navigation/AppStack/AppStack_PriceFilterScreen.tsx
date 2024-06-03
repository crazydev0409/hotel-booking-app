import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import tw from '../../../tailwindcss';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '.';
import LinearGradient from 'react-native-linear-gradient';
import GoBackIcon from '../../components/GoBackIcon';
import AnimationCard from '../../components/AnimationCard';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
type Props = NativeStackScreenProps<
  AppStackParamList,
  'AppStack_PriceFilterScreen'
>;

const ImageCard: React.FC = () => {
  return (
    <View>
      <View style={tw`w-25 h-25 rounded-[13px]`}>
        <Image
          source={require('../../../assets/images/2200-1000px-banner-Muna-1310x595 13.png')}
          style={tw`w-full h-full rounded-[13px]`}
        />
      </View>
      <Text style={tw`text-black text-[11px] px-3 py-1`}>Sylet</Text>
    </View>
  );
};
const AppStack_PriceFilterScreen: React.FC<Props> = ({navigation, route}) => {
  const [openPrice, setOpenPrice] = useState(false);
  const [openParks, setOpenParks] = useState(false);
  const [openMuseums, setOpenMuseums] = useState(false);
  const [keyBoardShow, setKeyBoardShow] = useState(false);
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardShow(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardShow(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const initialSetOpens = () => {
    setOpenPrice(false);
    setOpenParks(false);
    setOpenMuseums(false);
  };

  const initializeAll = () => {
    initialSetOpens();
  };
  const confirmSearch = () => {
    navigation.navigate('AppStack_HomePageScreen');
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
        <View style={tw`mt-5 ml-5 mb-10 mb-10 flex-row items-center`}>
          <GoBackIcon onPress={() => navigation.goBack()} />
          <Text style={tw`font-abril text-black text-[18px] ml-5`}>
            Price Filter
          </Text>
        </View>
        <View style={tw`px-1.5 w-full`}>
          <AnimationCard
            open={openPrice}
            onPress={() => {
              initialSetOpens();
              setOpenPrice(true);
            }}
            cardHeight={350}
            title="Hotels"
            smallTitle="Location"
            value="Dhaka">
            <View style={tw`flex-col items-center px-16`}>
              <Image
                source={require('../../../assets/images/hotel.png')}
                width={30}
                height={30}
                style={tw`rounded-full mb-5`}
              />
              <Text style={tw`text-black text-[11px] mb-3`}>Minimum price</Text>
              <TextInput
                style={{
                  ...tw`flex justify-center text-center h-12.5 bg-black/50 rounded-full mb-10 text-white text-[14px] px-4 w-full mb-3`,
                }}
                value={minimumPrice}
                onChangeText={setMinimumPrice}
                placeholder="$0"
                placeholderTextColor={'white'}
              />
              <Text style={tw`text-black text-[11px] mb-3`}>Maximum price</Text>
              <TextInput
                style={{
                  ...tw`flex justify-center text-center h-12.5 bg-black/50 rounded-full mb-10 text-white text-[14px] px-4 w-full mb-3`,
                }}
                value={maximumPrice}
                onChangeText={setMaximumPrice}
                placeholder="$0"
                placeholderTextColor={'white'}
              />
            </View>
          </AnimationCard>
          <AnimationCard
            open={openMuseums}
            onPress={() => {
              initialSetOpens();
              setOpenMuseums(true);
            }}
            title="When is your trip?"
            cardHeight={390}
            smallTitle="Parks"
            value={"I'm flexible"}>
            <View></View>
          </AnimationCard>
          <AnimationCard
            open={openParks}
            onPress={() => {
              initialSetOpens();
              setOpenParks(true);
            }}
            cardHeight={350}
            title="Who Is Comming?"
            smallTitle="Museums"
            value={"I'm flexible"}>
            <View></View>
          </AnimationCard>
        </View>
        {!keyBoardShow && (
          <View style={tw`absolute bottom-0 w-full`}>
            <View
              style={tw`h-20 shrink-0 rounded-t-5 bg-white flex-row justify-between items-center`}>
              <TouchableOpacity activeOpacity={0.5} onPress={initializeAll}>
                <Text style={tw`text-black font-dm text-[16px] font-bold mx-8`}>
                  Clear All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={confirmSearch}>
                <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-5`}>
                  <Text style={tw`text-white text-[18px] font-dm font-bold`}>
                    Search
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AppStack_PriceFilterScreen;
