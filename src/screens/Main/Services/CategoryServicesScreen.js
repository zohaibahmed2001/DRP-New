import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Imports
import { BASEOPACITY, COLORS } from '../../../globalStyle/Theme';
import { Container, Flex, Typography } from '../../../atomComponents';
import { Header } from '../../../components';
import Sizer from '../../../helpers/Sizer';
import RightIconSvg from '../../../assets/svgs/RightIconSvg';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { getCategoryServices } from '../../../api/bookingService';
import NoServicesSvg from '../../../assets/svgs/NoServicesSvg';

const CategoryServicesScreen = ({ navigation }) => {
  const route = useRoute();
  const { categoryId, categoryName, nextScreen } = route.params || {};

  const { data, isLoading } = useCustomQuery({
    queryKey: ['categoryServices', categoryId],
    queryFn: () => getCategoryServices(categoryId),
    enabled: !!categoryId,
  });

  console.log(data, categoryId);

  const handlePress = useCallback(
    item => {
      if (nextScreen) {
        navigation.navigate(nextScreen, { serviceId: item.id });
      } else {
        navigation.navigate('ServiceDetailsScreen', { serviceDetail: item });
      }
    },
    [navigation, nextScreen],
  );

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
      <TouchableOpacity
        style={styles.serviceCard}
        activeOpacity={BASEOPACITY}
        onPress={() => handlePress(item)}
      >
        <Flex direction="column" flex={1} gap={8}>
          <Typography
            color={COLORS.white100}
            fFamily="interTightSemiBold600"
            size={20}
            numberOfLines={2}
            textTransform="capitalize"
          >
            {item?.name}
          </Typography>

          <Typography
            color={COLORS.grey100}
            size={12}
            numberOfLines={3}
            textTransform="capitalize"
            LineHeight={18}
          >
            {item?.description}
          </Typography>
        </Flex>

        <View style={styles.imageCard}>
          <Image
            style={styles.serviceImage}
            source={{ uri: item?.image }}
            resizeMode="cover"
          />
          <View style={styles.imageCardFooter}>
            <Typography
              color={COLORS.black100}
              size={14}
              fFamily="poppinsSemiBold600"
              LineHeight={20}
              textTransform="capitalize"
            >
              {/* {item?.price} */}
            </Typography>
            <RightIconSvg height={20} width={20} color={COLORS.secondary} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Container
      conStyle={styles.container}
      isPadding={false}
      isPaddingVertical={false}
    >
      <Header
        type="app"
        title={categoryName || 'Services'}
        isBackVisible={true}
      />

      <View style={styles.contentContainer}>
        {!isLoading && !data?.length ? (
          <View style={styles.emptyState}>
            <NoServicesSvg />
            <Typography color={COLORS.white100} size={16} mT={20}>
              No services found in this category.
            </Typography>
          </View>
        ) : (
          <FlatList
            data={data || []}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        )}
      </View>
    </Container>
  );
};

export default CategoryServicesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Sizer.fS(16),
    paddingTop: Sizer.vSize(20),
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface3,
    borderRadius: Sizer.fS(16),
    padding: Sizer.fS(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  imageCard: {
    width: Sizer.hSize(100),
    backgroundColor: COLORS.surface3,
    padding: Sizer.vSize(4),
    borderRadius: Sizer.fS(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceImage: {
    width: '100%',
    height: Sizer.hSize(80),
    borderRadius: Sizer.fS(6),
    marginBottom: 4,
  },
  imageCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: Sizer.vSize(40),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
