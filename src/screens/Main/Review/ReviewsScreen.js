import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
//------
import { Container, Typography } from '../../../atomComponents';
import { COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import { Header } from '../../../components';
import Sizer from '../../../helpers/Sizer';
import { getFeaturedReviews } from '../../../api/generalService';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { ReviewItem } from './ReviewsList';

const dummyReviews = [
  {
    id: 'd1',
    user: {
      name: 'John Smith',
      image:
        'https://pro-fixer.demoappprojects.com/rjp-custom-concrete-and-interiors/public//users-image/no-image.jpg',
    },
    service_name: 'Custom Paving',
    star: 5,
    description:
      'Expert craftsmanship and attention to detail. The team was professional and finished the project on time. Highly recommend for any concrete work!',
    date: '2025-12-22',
  },
  {
    id: 'd2',
    user: {
      name: 'Sarah Johnson',
      image:
        'https://pro-fixer.demoappprojects.com/rjp-custom-concrete-and-interiors/public//users-image/no-image.jpg',
    },
    service_name: 'Driveway Repair',
    star: 5,
    description:
      'Very happy with the results. They fixed our cracked driveway and it looks brand new. Great communication throughout the process.',
    date: '2025-12-20',
  },
  {
    id: 'd3',
    user: {
      name: 'Michael Brown',
      image:
        'https://pro-fixer.demoappprojects.com/rjp-custom-concrete-and-interiors/public//users-image/no-image.jpg',
    },
    service_name: 'Patio Installation',
    star: 4,
    description:
      'The patio looks great. A bit of a delay due to weather, but the quality of work is top-notch. Would use them again.',
    date: '2025-12-15',
  },
];

import { ActivityIndicator } from 'react-native-paper';
import NoDataSvg from '../../../assets/svgs/NoDataSvg';

const ReviewsScreen = ({ navigation }) => {
  const { data: reviewsResponse, isLoading } = useCustomQuery({
    queryKey: ['featuredReviews'],
    queryFn: getFeaturedReviews,
  });

  const featuredData = reviewsResponse?.data || [];

  const reviews =
    featuredData.length > 0
      ? featuredData.map(item => ({
          id: item.id,
          user: {
            name: item.user_name,
            image: item.user_image,
          },
          service_name: item.service_name,
          star: item.star,
          description: item.description,
          date: item.date,
        }))
      : [];

  const renderItem = ({ item }) => {
    return <ReviewItem review={item} />;
  };

  return (
    <Container isPadding={false} isPaddingVertical={false}>
      <Header type="app" title="Reviews" />
      {isLoading ? (
        <View style={GLOBALSTYLE.loadingContainer}>
          <ActivityIndicator size={30} color={COLORS.secondary} />
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizer.vSize(50),
            ...GLOBALSTYLE.paddingHor,
            flexGrow: 1,
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <NoDataSvg size={Sizer.hSize(200)} color={COLORS.secondary} />
              <Typography
                size={18}
                fFamily="poppinsSemiBold600"
                color={COLORS.white100}
                mT={20}
              >
                No Reviews Yet
              </Typography>
              <Typography
                size={14}
                color={COLORS.grey500}
                textAlign="center"
                mT={8}
                style={{ maxWidth: '80%' }}
              >
                Be the first to share your experience with our services!
              </Typography>
            </View>
          }
          style={{
            marginTop: Sizer.vSize(10),
          }}
        />
      )}
    </Container>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Sizer.vSize(100),
  },
});
