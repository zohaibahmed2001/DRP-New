import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@react-native-vector-icons/entypo';
//-------
import { Flex, Typography } from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import { BASEOPACITY, COLORS } from '../../globalStyle/Theme';
import Icon from '../../helpers/Icon';
import { discountedPrice } from '../../utils';
import StarRating from '../../screens/_partials/Reviews/StarRating';

const BookingItem = ({ item, onPressCard }) => {
  const { salePrice } = discountedPrice(
    item?.service?.price,
    item?.service?.discount,
  );

  const navigation = useNavigation();

  const handleChatPress = () => {
    navigation.navigate('BookingChatScreen', {
      booking_id: item?.id,
      bookingStatus: item?.status,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressCard}
      style={{
        backgroundColor: COLORS.surface3,
        borderRadius: Sizer.hSize(12),
        paddingHorizontal: Sizer.vSize(20),
        paddingVertical: Sizer.hSize(20),
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <Flex jusContent="space-between" algItems="center">
        <Typography size={12} color={COLORS.grey500} fFamily="poppinsMedium500">
          Booking ID #{item?.id}
        </Typography>

        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          style={{
            borderRadius: Sizer.vSize(30),
            padding: Sizer.fS(8),
            backgroundColor: COLORS.secondary,
          }}
          onPress={handleChatPress}
        >
          <Entypo name="chat" size={Sizer.fS(16)} color={COLORS.white100} />
        </TouchableOpacity>
      </Flex>
      <View
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: Sizer.vSize(5),
          alignSelf: 'flex-end',
          padding: Sizer.vSize(3),
          paddingHorizontal: Sizer.vSize(8),
          marginTop: 10,
        }}
      >
        <Typography
          size={12}
          color={COLORS.white100}
          fFamily="poppinsMedium500"
          textTransform={'capitalize'}
        >
          {item?.status}
        </Typography>
      </View>

      {/* Date and Time */}
      <Flex
        jusContent="space-between"
        direction={'column'}
        gap={8}
        {...(item?.status == 'completed' ? { direction: 'column' } : {})}
      >
        <Flex algItems="center" gap={4}>
          <Icon
            name="calendar"
            size={Sizer.fS(20)}
            color={COLORS.secondary}
            iconFamily={'MaterialCommunityIcons'}
          />
          <Typography
            size={16}
            color={COLORS.secondary}
            fFamily="poppinsMedium500"
          >
            Date:
          </Typography>
          <Typography size={16} fFamily="poppinsMedium500" color={COLORS.white100}>
            {item?.booking_date}
          </Typography>
        </Flex>
      </Flex>

      <Flex algItems="center" gap={8} mT={8}>
        <Icon
          name="home-repair-service"
          size={Sizer.fS(20)}
          color={COLORS.secondary}
          iconFamily={'MaterialIcons'}
        />
        <Typography
          size={16}
          color={COLORS.secondary}
          fFamily="poppinsMedium500"
          mR={4}
        >
          Service {String(1).padStart(2, '0')}:
        </Typography>
        <Typography
          size={16}
          fFamily="poppinsMedium500"
          numberOfLines={1}
          style={{ flex: 1 }}
          color={COLORS.white100}
        >
          {item?.service?.name}
        </Typography>
      </Flex>

      {item?.status == 'completed' && (
        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          disabled={!!item?.reviews?.length}
          style={styles.review}
          onPress={() =>
            navigation.navigate('PostReviewScreen', { booking_id: item?.id })
          }
        >
          <Icon
            name={'reviews'}
            iconFamily={'MaterialIcons'}
            size={14}
            color={COLORS.green}
          />
          <Typography color={COLORS.green}>
            {item?.reviews?.length ? 'Reviewed by You' : 'Provide Reviews'}
          </Typography>
          {item?.reviews?.length > 0 && (
            <StarRating
              size={12}
              ratingMargin={2}
              starColor={'#ffcda5'}
              ratingStar={item?.reviews?.[0]?.star}
              marginTop={0}
            />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  review: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
});

export default BookingItem;
