import React, { useState } from 'react';
import { View, Image, FlatList } from 'react-native';

//--------
import Sizer from '../../../helpers/Sizer';
import { COLORS } from '../../../globalStyle/Theme';
import { Flex, Typography, Paragraph } from '../../../atomComponents';
import Icon from '../../../helpers/Icon';

export const ReviewItem = ({ review }) => {
  return (
    <View
      style={{
        padding: Sizer.vSize(16),
        backgroundColor: COLORS.surface3,
        borderRadius: Sizer.hSize(12),
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: Sizer.vSize(16),
      }}
    >
      <Flex jusContent="space-between" algItems="flex-start" mB={16}>
        <Flex algItems="center" gap={12}>
          <Image
            source={{ uri: review?.user?.image }}
            style={{
              width: Sizer.vSize(44),
              height: Sizer.vSize(44),
              borderRadius: Sizer.vSize(22),
              backgroundColor: COLORS.hover,
            }}
          />
          <View>
            <Typography
              size={15}
              color={COLORS.white100}
              fFamily="interTightSemiBold600"
              textTransform={'capitalize'}
            >
              {review?.user?.name}
            </Typography>
            {review?.date && (
              <Typography size={10} color={COLORS.grey500} mT={2}>
                {review?.date}
              </Typography>
            )}
          </View>
        </Flex>

        <View
          style={{
            backgroundColor: COLORS.secondary + '15',
            borderColor: COLORS.secondary,
            borderWidth: 1,
            borderRadius: Sizer.hSize(20),
            paddingHorizontal: Sizer.vSize(10),
            paddingVertical: Sizer.hSize(4),
          }}
        >
          <Flex algItems="center" gap={4}>
            <Icon name="star" size={Sizer.fS(14)} color={COLORS.secondary} />
            <Typography
              size={12}
              color={COLORS.secondary}
              fFamily="poppinsBold700"
            >
              {review?.star}
            </Typography>
          </Flex>
        </View>
      </Flex>

      {review?.service_name && (
        <Flex algItems="center" gap={6} mB={8}>
          <Icon
            name="home-repair-service"
            size={Sizer.fS(14)}
            color={COLORS.secondary}
            iconFamily="MaterialIcons"
          />
          <Typography
            size={13}
            color={COLORS.secondary}
            fFamily="poppinsMedium500"
          >
            {review?.service_name}
          </Typography>
        </Flex>
      )}

      <Paragraph
        text={review?.description}
        numberOfLines={5}
        size={13}
        color={COLORS.grey100}
        LineHeight={20}
      />
    </View>
  );
};

export const ReviewsList = ({ selectedRating = 'all', reviewsData = [] }) => {
  const renderReviewItem = ({ item }) => {
    return <ReviewItem review={item} />;
  };

  const ListEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Sizer.vSize(50),
        }}
      >
        <Typography
          size={16}
          color={COLORS.grey500}
          fFamily="poppinsMedium500"
          textAlign="center"
        >
          No reviews found for{' '}
          {selectedRating === 'all'
            ? 'this filter'
            : `${selectedRating} star rating`}
        </Typography>
      </View>
    );
  };

  const ListHeader = () => {
    if (reviewsData.length === 0) return null;
    return (
      <View
        style={{
          paddingVertical: Sizer.vSize(12),
          marginBottom: Sizer.vSize(8),
        }}
      >
        <Typography size={14} color={COLORS.grey500} fFamily="poppinsMedium500">
          Showing {reviewsData?.length} review
          {reviewsData.length !== 1 ? 's' : ''}
          {selectedRating !== 'all' &&
            ` for ${selectedRating} star${selectedRating !== 1 ? 's' : ''}`}
        </Typography>
      </View>
    );
  };

  return (
    <FlatList
      data={reviewsData}
      renderItem={renderReviewItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
};
