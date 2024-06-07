import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '.';
import tw from '../../../tailwindcss';
import LinearGradient from 'react-native-linear-gradient';
import {
  Coffee,
  CoffeeBlack,
  Group,
  Swimming,
  SwimmingBlack,
  Cancel,
  Cross,
} from '../../lib/images';
import GoBackIcon from '../../components/GoBackIcon';

type Props = NativeStackScreenProps<AppStackParamList, 'AppStack_DetailScreen'>;
type IDetailCardProps = {
  title: string;
  backgroundColor: string;
  type: number;
  item: any;
  selected: boolean;
};
const {width} = Dimensions.get('window');
const ImageSwiper = ({images}) => (
  <FlatList
    data={images}
    renderItem={({item}) => (
      <Image source={item} style={tw`w-[${width}px] h-96`} />
    )}
    keyExtractor={item => item.toString()}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
  />
);
const DetailCard = ({
  title,
  backgroundColor,
  type,
  item,
  selected,
}: IDetailCardProps) => {
  return (
    <View
      style={[
        tw`rounded-[13px] w-[${width / 2}px] ${backgroundColor} border-2`,
        selected ? tw`border-[#FF5C00]` : tw`border-transparent`,
      ]}>
      <Image
        source={type === 0 ? item.images[1] : item.images[2]}
        height={180}
        style={tw`rounded-[13px] mb-2 w-full h-[180px]`}
      />
      <View style={tw`p-2`}>
        <Text
          style={tw`text-white font-dm text-[12px] font-bold text-left mb-2`}>
          {title}
        </Text>
        <View style={tw`flex-row items-end w-full justify-between mb-1`}>
          <View>
            <View style={tw`flex-row items-center`}>
              <Image source={Group} style={tw`h-3 w-3 mr-1`} />
              <Text style={tw`text-white font-dm text-[5px] font-bold`}>
                2 Adults, 1 Child
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Image source={Coffee} style={tw`h-3 w-3 mr-1`} />
              <Text style={tw`text-white font-dm text-[5px] font-bold mr-1.5`}>
                Free Breakfast
              </Text>
              <Image source={Swimming} style={tw`h-3 w-3 mr-1`} />
              <Text style={tw`text-white font-dm text-[5px] font-bold`}>
                Swimming Pool
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Image source={Swimming} style={tw`h-3 w-3 mr-1`} />
              <Text style={tw`text-white font-dm text-[5px] font-bold`}>
                Free Cancellation Within 24 Hours
              </Text>
            </View>
          </View>
          <View>
            <View
              style={tw`w-8.5 h-4 rounded-[3px] bg-[#8B2500] flex-row justify-center items-center`}>
              <Text style={tw`text-white font-dm text-[8px] font-bold`}>
                {item.availables} Left
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-row gap-3 justify-end`}>
          {type === 0 && (
            <Text
              style={tw`text-white font-dm text-[18px] line-through font-bold`}>
              ${item.oldPrice}
            </Text>
          )}
          <Text style={tw`text-[#FF5C00] font-dm text-[18px] font-bold`}>
            ${item.newPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
const AppStack_DetailScreen: React.FC<Props> = ({navigation, route}) => {
  const defaultRooms = [
    {
      title: 'Infinity Sea View',
      backgroundColor: 'bg-black',
      type: 0,
      item: route.params.item,
      selected: false,
    },
    {
      title: 'SuperDeluxe',
      backgroundColor: 'bg-[#1E2761]',
      type: 1,
      item: route.params.item,
      selected: false,
    },
    {
      title: 'Infinity Sea View',
      backgroundColor: 'bg-black',
      type: 0,
      item: route.params.item,
      selected: false,
    },
  ];
  const [rooms, setRooms] = React.useState(defaultRooms);
  const onPressReserve = () => {
    // navigation.navigate('AppStack_ReservationScreen');
  };
  return (
    <LinearGradient
      colors={['#FFF', '#1E2761']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={tw`flex-1`}>
      <ScrollView>
        <View style={tw`relative`}>
          <View style={tw`absolute top-5 left-5 z-10`}>
            <GoBackIcon onPress={() => navigation.goBack()} />
          </View>
          <ImageSwiper images={route.params.item.images} />
          <View
            style={tw`absolute bottom-1.5 right-2 w-7 h-4 rounded-[3px] bg-black`}>
            <Text
              style={tw`text-white text-center font-dm text-[8px] font-bold leading-[9px]`}>
              35
            </Text>
            <Text
              style={tw`text-white text-center font-dm text-[5px] font-bold leading-[6px]`}>
              Pics
            </Text>
          </View>
        </View>
        <View style={tw`px-2`}>
          <Text style={tw`text-black font-abril text-[18px] font-bold py-2`}>
            {route.params.item.title}
          </Text>
          <View style={tw`flex-row gap-2 mb-1`}>
            <View style={tw`w-7 h-4 rounded-[3px] bg-[#1BF28B] mb-0.5`}>
              <Text
                style={tw`text-black text-center font-dm text-[8px] font-bold leading-[9px]`}>
                {route.params.item.rating}
              </Text>
              <Text
                style={tw`text-black text-center font-dm text-[5px] font-bold leading-[6px]`}>
                Ratings
              </Text>
            </View>
            <View style={tw`w-7 h-4 rounded-[3px] bg-white mb-0.5`}>
              <Text
                style={tw`text-black text-center font-dm text-[8px] font-bold leading-[9px]`}>
                3
              </Text>
              <Text
                style={tw`text-black text-center font-dm text-[5px] font-bold leading-[6px]`}>
                Star Hotel
              </Text>
            </View>
          </View>
          <Text style={tw`text-black font-dm text-[5px] font-bold mb-4.5`}>
            {'See all 500 customer reviews >'}
          </Text>
          <Text style={tw`text-black font-dm text-[18px] font-bold mb-1.5`}>
            Amenities
          </Text>
          <View style={tw`flex-row mb-1.5 items-center`}>
            <Image source={CoffeeBlack} style={tw`h-3 w-3 mr-1`} />
            <Text style={tw`text-black font-dm text-[5px] mr-3`}>
              Free Breakfast
            </Text>
            <Image source={SwimmingBlack} style={tw`h-3 w-3 mr-1`} />
            <Text style={tw`text-black font-dm text-[5px]`}>Swimming Pool</Text>
          </View>
          <Text style={tw`text-black font-dm text-[18px] font-bold mb-1.5`}>
            Policies
          </Text>
          <Text style={tw`text-black font-dm text-[10px] font-bold mb-1.5`}>
            Check In
          </Text>
          <View style={tw`ml-6`}>
            <Text style={tw`text-black font-dm text-[8px] font-bold mb-1.5`}>
              Check In Starts At 3:PM
            </Text>
            <Text style={tw`text-black font-dm text-[8px] font-bold mb-1.5`}>
              Minimum Check In Age 21
            </Text>
            <Text style={tw`text-black font-dm text-[8px] font-bold mb-1.5`}>
              Photo Id Needed For Check In
            </Text>
          </View>
          <Text style={tw`text-black font-dm text-[10px] font-bold mb-1.5`}>
            Check-Out
          </Text>
          <View style={tw`ml-6 mb-5`}>
            <Text style={tw`text-black font-dm text-[8px] font-bold mb-1.5`}>
              Check In Starts At 3:PM
            </Text>
          </View>
          <Text style={tw`text-black font-dm text-[18px] font-bold mb-1.5`}>
            Rooms
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`gap-3 flex-row mb-4`}>
              {rooms.map((room, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => {
                    const newRooms = rooms.map((r, i) => {
                      if (i === index) {
                        return {...r, selected: true};
                      }
                      return {...r, selected: false};
                    });
                    setRooms(newRooms);
                  }}>
                  <DetailCard
                    title={room.title}
                    backgroundColor={room.backgroundColor}
                    type={room.type}
                    item={room.item}
                    selected={room.selected}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={tw`h-21 bg-[#1E2761] flex-row justify-between`}>
          <View style={tw`pt-4 px-8`}>
            <Text style={tw`text-white font-dm text-[18px] font-bold`}>
              BDT 26,585
            </Text>
            <Text style={tw`text-white font-dm text-[6px] font-bold`}>
              +BDT 7,045 Taxes & Fees For 1 Night
            </Text>
          </View>
          <View style={tw`pt-3 px-4`}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressReserve}
              style={tw`shrink-0 rounded-t-5 flex-row justify-end items-center`}>
              <View style={tw`py-2.5 px-8 rounded-[13px] bg-[#FF5C00] mr-0`}>
                <Text style={tw`text-white text-[18px] font-dm font-bold`}>
                  Reserve
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AppStack_DetailScreen;
