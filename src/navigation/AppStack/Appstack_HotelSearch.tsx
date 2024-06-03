import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import tw from '../../../tailwindcss';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '.';
import LinearGradient from 'react-native-linear-gradient';
import GoBackIcon from '../../components/GoBackIcon';
import AnimationCard from '../../components/AnimationCard';
import {Cancel, Marker} from '../../lib/images';
import {getPlacesByQuery} from '../../helpers/common';
import {mapApiKey} from '../../helpers/http';
import {DecreaseIcon, IncreaseIcon} from '../../components/PlusMinusIcons';
import {CalendarList} from 'react-native-calendars';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
type Props = NativeStackScreenProps<AppStackParamList, 'AppStack_HotelSearch'>;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const screenWidth = Dimensions.get('window').width;
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
const AppStack_HotelSearch: React.FC<Props> = ({navigation, route}) => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [locationFocus, setLocationFocus] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [locationSelected, setLocationSelected] = useState({} as any);
  const [searchLocationResults, setSearchLocationResults] = useState([]);
  const [locationCardHeight, setLocationCardHeight] = useState(320);
  const [tripDate, setTripDate] = useState('I am Flexible');
  const [guests, setGuests] = useState({adults: 0, children: 0, infants: 0});
  const [keyBoardShow, setKeyBoardShow] = useState(false);
  const locationSearchWidth = useRef(new Animated.Value(0)).current;
  console.log({locationSelected: JSON.stringify(locationSelected)});
  const locationSearchWidthAnim = Animated.timing(locationSearchWidth, {
    toValue: locationFocus ? screenWidth - 50 : 264,
    duration: 200,
    useNativeDriver: false,
  });
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
  useEffect(() => {
    if (locationFocus) setLocationCardHeight(500);
    else setLocationCardHeight(320);
    locationSearchWidthAnim.stop();
    locationSearchWidthAnim.start();
  }, [locationFocus]);

  useEffect(() => {
    if (locationText.length >= 2) {
      getPlacesByQuery(
        locationText,
        'AIzaSyDEGDxLK7KpB3DGFqVLSrcJQkVWU4be_zQ',
      ).then(places => {
        setSearchLocationResults(places);
      });
    }
  }, [locationText]);

  const initialSetOpens = () => {
    setOpenLocation(false);
    setOpenGuests(false);
    setOpenCalendar(false);
  };
  const selectLocation = (item: any) => {
    setLocationFocus(false);
    setLocationText('');
    setLocationSelected(item);
    setSearchLocationResults([]);
    initialSetOpens();
    setOpenCalendar(true);
  };
  const initializeAll = () => {
    initialSetOpens();
    setLocationSelected({});
    setTripDate('I am Flexible');
    setGuests({adults: 0, children: 0, infants: 0});
  };
  const confirmSearch = () => {
    if (!locationSelected.name) return alert('Please select a location');
    if (tripDate === 'I am Flexible') return alert('Please select a date');
    if (guests.adults === 0 && guests.children === 0 && guests.infants === 0)
      return alert('Please select number of guests');
    navigation.navigate('AppStack_HomePageScreen', {
      searchResult: {
        latitude: locationSelected.geometry.location.lat,
        longitude: locationSelected.geometry.location.lng,
      },
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
        <View style={tw`mt-5 ml-5 mb-10 mb-10 flex-row items-center`}>
          <GoBackIcon onPress={() => navigation.goBack()} />
          <Text style={tw`font-abril text-black text-[18px] ml-5`}>Search</Text>
        </View>
        <View style={tw`px-1.5 w-full`}>
          <AnimationCard
            open={openLocation}
            onPress={() => {
              initialSetOpens();
              setOpenLocation(true);
            }}
            cardHeight={locationCardHeight}
            title="Where"
            smallTitle="Location"
            value={locationSelected.name || 'Add Location'}>
            <View style={tw`flex-col items-center`}>
              <AnimatedTextInput
                style={{
                  ...tw`flex justify-center ${
                    locationFocus ? 'text-left' : 'text-center'
                  } h-12.5 bg-black/50 rounded-full mb-10 text-white text-[14px] px-4`,
                  width: locationSearchWidth,
                }}
                value={locationText}
                onChangeText={setLocationText}
                onFocus={() => setLocationFocus(true)}
                placeholder="Search for locations"
                placeholderTextColor={'white'}
              />
            </View>
            {locationFocus && (
              <FlatList
                style={tw`w-full h-80`}
                data={searchLocationResults}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={tw`flex-row items-center px-7.5 pb-7`}
                    onPress={() => selectLocation(item)}>
                    <View
                      style={tw`w-16 h-16 rounded-[12px] bg-[#D0D8DA] flex-row justify-center items-center mr-4`}>
                      <Image source={Marker} style={tw`w-7.5 h-7.5`} />
                    </View>
                    <Text style={tw`text-black font-abril text-[14px] flex-1`}>
                      {item.formatted_address}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {!locationFocus && (
              <ScrollView
                scrollEnabled={true}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                style={tw`mx-4`}>
                <View style={tw`flex flex-row gap-2`}>
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </View>
              </ScrollView>
            )}
          </AnimationCard>
          <AnimationCard
            open={openCalendar}
            onPress={() => {
              initialSetOpens();
              setOpenCalendar(true);
            }}
            title="When is your trip?"
            cardHeight={390}
            smallTitle="When"
            value={tripDate}>
            <View style={tw`flex-col items-center px-2`}>
              <CalendarList
                style={tw`min-w-full max-h-70 pt-0`}
                onDayPress={day => {
                  setTripDate(day.dateString);
                  initialSetOpens();
                  setOpenGuests(true);
                }}
                markedDates={{
                  [tripDate]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: '#00adf5',
                    selectedTextColor: '#ffffff',
                  },
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: 'blue',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </View>
          </AnimationCard>
          <AnimationCard
            open={openGuests}
            onPress={() => {
              initialSetOpens();
              setOpenGuests(true);
            }}
            cardHeight={350}
            title="Who Is Comming?"
            smallTitle="Guests"
            value="Add Guests">
            <View style={tw`flex-col items-center px-6.5`}>
              <View
                style={tw`flex-row items-center justify-between w-full pb-5 mb-5 border-b-[1px] border-[#93999A]`}>
                <View style={tw`flex-col gap-1`}>
                  <Text style={tw`text-black text-[14px] font-dm font-bold`}>
                    Adults
                  </Text>
                  <Text style={tw`text-[#93999A] text-[12px] font-dm`}>
                    Ages 13+
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <DecreaseIcon
                    onPress={() => {
                      if (guests.adults > 0) {
                        setGuests({...guests, adults: guests.adults - 1});
                      }
                    }}
                    disabled={guests.adults === 0}
                  />
                  <Text style={tw`text-black text-[14px] font-abril mx-5`}>
                    {guests.adults}
                  </Text>
                  <IncreaseIcon
                    onPress={() => {
                      setGuests({...guests, adults: guests.adults + 1});
                    }}
                  />
                </View>
              </View>
              <View
                style={tw`flex-row items-center justify-between w-full pb-5 mb-5 border-b-[1px] border-[#93999A]`}>
                <View style={tw`flex-col gap-1`}>
                  <Text style={tw`text-black text-[14px] font-dm font-bold`}>
                    Children
                  </Text>
                  <Text style={tw`text-[#93999A] text-[12px] font-dm`}>
                    Ages 2 - 12
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <DecreaseIcon
                    onPress={() => {
                      if (guests.children > 0) {
                        setGuests({...guests, children: guests.children - 1});
                      }
                    }}
                    disabled={guests.children === 0}
                  />
                  <Text style={tw`text-black text-[14px] font-abril mx-5`}>
                    {guests.children}
                  </Text>
                  <IncreaseIcon
                    onPress={() => {
                      setGuests({...guests, children: guests.children + 1});
                    }}
                  />
                </View>
              </View>
              <View
                style={tw`flex-row items-center justify-between w-full pb-5 mb-5 border-b-[1px] border-[#93999A]`}>
                <View style={tw`flex-col gap-1`}>
                  <Text style={tw`text-black text-[14px] font-dm font-bold`}>
                    Infants
                  </Text>
                  <Text style={tw`text-[#93999A] text-[12px] font-dm`}>
                    Under 2
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <DecreaseIcon
                    onPress={() => {
                      if (guests.infants > 0) {
                        setGuests({...guests, infants: guests.infants - 1});
                      }
                    }}
                    disabled={guests.infants === 0}
                  />
                  <Text style={tw`text-black text-[14px] font-abril mx-5`}>
                    {guests.infants}
                  </Text>
                  <IncreaseIcon
                    onPress={() => {
                      setGuests({...guests, infants: guests.infants + 1});
                    }}
                  />
                </View>
              </View>
            </View>
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

export default AppStack_HotelSearch;
