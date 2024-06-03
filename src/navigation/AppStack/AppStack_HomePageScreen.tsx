import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Animated,
  PanResponder,
  useAnimatedValue,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AppStackParamList} from '.';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import {Cancel, Coffee, Swimming, ToBelow} from '../../lib/images';
// import Animated from 'react-native-reanimated';
type Props = NativeStackScreenProps<
  AppStackParamList,
  'AppStack_HomePageScreen'
>;

interface ICardProps {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'AppStack_HomePageScreen'
  >;
  setCardHeight: React.Dispatch<React.SetStateAction<number>>;
}
const windowsHeight = Dimensions.get('window').height;
const HotelCard: React.FC = ({navigation, setCardHeight}: ICardProps) => {
  const onPressToDetail = () => {
    navigation.navigate('AppStack_DetailScreen');
  };
  return (
    <TouchableOpacity onPress={onPressToDetail} activeOpacity={0.5}>
      <View
        onLayout={event => {
          setCardHeight(event.nativeEvent.layout.height);
        }}
        style={tw`m-3 rounded-[13px] border-[1px] border-[#0A0A0A] bg-black flex-row`}>
        <Image
          source={require('../../../assets/images/2200-1000px-banner-Muna-1310x595 15.png')}
          style={tw`rounded-[13px] mr-2.5`}
          width={180}
          height={180}
        />
        <View style={tw`m-3`}>
          <Text
            style={tw`h-13 w-40 text-white font-dm font-bold text-[14px] flex-shrink mb-2 leading-[18px]`}>
            Hampton Inn & Suites Newburgh Stewart Airport
          </Text>
          <View style={tw`flex-row mb-1.5`}>
            <Image source={Coffee} style={tw`h-3 w-3 `} />
            <Text style={tw`text-white font-dm text-[5px] leading-4 mr-3`}>
              Free Breakfast
            </Text>
            <Image source={Swimming} style={tw`h-3 w-3`} />
            <Text style={tw`text-white font-dm text-[5px] leading-4`}>
              Swimming Pool
            </Text>
          </View>
          <View style={tw`w-7 h-4 rounded-[3px] bg-[#1BF28B] mb-0.5`}>
            <Text
              style={tw`text-black text-center font-dm text-[8px] font-bold leading-[9px]`}>
              9.5
            </Text>
            <Text
              style={tw`text-black text-center font-dm text-[5px] font-bold leading-[6px]`}>
              Ratings
            </Text>
          </View>
          <View style={tw`flex-col items-end`}>
            <View
              style={tw`w-8.5 h-4 rounded-[3px] bg-[#8B2500] flex-row justify-center items-center mb-2`}>
              <Text style={tw`text-white font-dm text-[8px] font-bold`}>
                1 Left
              </Text>
            </View>
            <View style={tw`flex-row gap-3`}>
              <Text
                style={tw`text-white font-dm text-[18px] line-through font-bold`}>
                $143
              </Text>
              <Text style={tw`text-[#FF5C00] font-dm text-[18px] font-bold`}>
                $113
              </Text>
            </View>
            <Text style={tw`text-white font-dm text-[5px] font-bold`}>
              not includes taxes & fees
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const AppStack_HomePageScreen: React.FC<Props> = ({navigation, route}) => {
  const [showText, setShowText] = useState(true);
  const [cardHeight, setCardHeight] = useState(0);
  const mousePositionRef = useRef(0);
  const [itemCount, setItemCount] = useState(4);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const topSheetPosition = useAnimatedValue(windowsHeight - 80);
  const topListBackgroundOpactiy = useAnimatedValue(0);
  const animatedStyle = {
    backgroundColor: topListBackgroundOpactiy.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    }),
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (event, gestureState) => {
      // Set the initial position of the bottom sheet
      mousePositionRef.current = topSheetPosition._value;
    },
    onPanResponderMove: (event, gestureState) => {
      if (showText === true && gestureState.dy < 0) {
        setShowText(false);
      }
      const currentPoint = mousePositionRef.current + gestureState.dy;
      topListBackgroundOpactiy.setValue(
        (windowsHeight - currentPoint) / (windowsHeight - 60),
      );
      const cardsPullingHeight = (cardHeight + 26) * itemCount + 48;
      const limitPullingHeight =
        cardsPullingHeight + 60 > windowsHeight
          ? 60
          : windowsHeight - cardsPullingHeight;
      if (
        currentPoint > limitPullingHeight &&
        currentPoint < windowsHeight - 20
      )
        topSheetPosition.setValue(currentPoint);
    },
    onPanResponderRelease: () => {
      if (topSheetPosition._value > windowsHeight - 60) {
        setShowText(true);
        topSheetPosition.setValue(windowsHeight - 80);
      }
      // If the position is above -200, snap back to -400
    },
  });
  console.log({region});
  useEffect(() => {
    if (route.params?.searchResult) {
      setRegion({
        latitude: route.params.searchResult.latitude,
        longitude: route.params.searchResult.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [route.params?.searchResult]);
  return (
    <View style={tw`flex-1 relative`}>
      <Animated.View
        style={{
          ...tw`flex-row items-start absolute top-0 left-0 pt-3 right-0 h-20 z-10`,
          ...animatedStyle,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`relative mx-3 mb-2`}
          onPress={() => navigation.navigate('AppStack_PriceFilterScreen')}>
          <Image source={Cancel} style={tw`w-[38px] h-[38px]`} />
          <View style={tw`absolute top-[10px] left-[10px] w-full`}>
            <Image source={ToBelow} style={tw`w-[18px] h-[18px] z-50`} />
          </View>
        </TouchableOpacity>
        {Array.from({length: 9}).map((_, index) => (
          <View style={tw`flex-1 flex-col items-center`} key={index}>
            <Image
              source={require('../../../assets/images/hotel.png')}
              width={30}
              height={30}
              style={tw`rounded-full`}
            />
            <Text
              style={tw`text-black text-center font-bold font-dm text-[8px]`}>
              Hotel
            </Text>
          </View>
        ))}
      </Animated.View>
      <View
        style={tw`absolute bottom-25 left-0 right-0 flex-row justify-center gap-10 z-20`}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('AppStack_ProfileScreen');
          }}>
          <View
            style={tw`px-3.5 py-1 flex-row justify-center items-center rounded-full bg-white h-7.5`}>
            <Text
              style={tw`text-black font-dm text-[16px] capitalize font-bold`}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('AppStack_HotelSearch');
          }}>
          <View
            style={tw`px-13 py-2 flex-row justify-center items-center rounded-full bg-[#222222]/50 h-7.5`}>
            <Text style={tw`text-white font-dm text-[11px] capitalize`}>
              Where to?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <MapView
        showsCompass={false}
        mapType="standard"
        style={tw`h-full w-full`}
        provider={PROVIDER_GOOGLE}
        region={region}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="xxx hotel"
          description="This is a hotel">
          <View
            style={tw`w-7 h-4 rounded-[3px] bg-[#1E2761] flex-row justify-center items-center`}>
            <Text
              style={tw`text-white text-[8px] text-center font-dm font-bold`}>
              $100
            </Text>
          </View>
        </Marker>
      </MapView>
      <Animated.View
        hitSlop={{top: 0, bottom: 0, left: 0, right: 0}}
        style={{
          ...tw`absolute left-0 right-0 z-20 h-${(windowsHeight - 60) / 4}`,
          top: topSheetPosition,
        }}>
        <LinearGradient
          colors={['#FFF', '#1E2761']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={tw`rounded-t-5 flex-col items-center`}>
          <View
            style={tw`min-h-[50px] w-full flex items-center justify-center`}
            {...panResponder.panHandlers}>
            <View style={tw`w-24 h-1 bg-[#93999A] rounded-full`} />
          </View>
          {showText && (
            <Text style={tw`text-black font-dm text-[16px] font-bold mb-2`}>
              Over 1000 Amazing Places
            </Text>
          )}

          <FlatList
            data={Array.from({length: itemCount}, (_, index) => index + 1)}
            keyExtractor={item => item.toString()}
            style={{maxHeight: windowsHeight - 180}}
            renderItem={() => (
              <HotelCard
                navigation={navigation}
                setCardHeight={setCardHeight}
              />
            )}
          />
          <View
            style={tw`flex-row justify-center items-center gap-10 z-20 h-17.5`}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setShowText(true);
                topSheetPosition.setValue(windowsHeight - 80);
              }}>
              <View
                style={tw`px-3.5 py-1 flex-row justify-center items-center rounded-full bg-white h-7.5`}>
                <Text
                  style={tw`text-black font-dm text-[16px] capitalize font-bold`}>
                  Map
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('AppStack_HotelSearch');
              }}>
              <View
                style={tw`px-13 py-2 flex-row justify-center items-center rounded-full bg-[#222222]/50 h-7.5`}>
                <Text style={tw`text-white font-dm text-[11px] capitalize`}>
                  Where to?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default AppStack_HomePageScreen;
