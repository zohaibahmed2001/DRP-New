import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
//----
import { Container, Flex, Typography } from '../../../atomComponents';
import { BASEOPACITY, COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import { Header } from '../../../components';
import Sizer from '../../../helpers/Sizer';
import { star } from '../../../assets/images';
import { getServices } from '../../../api/bookingService';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { discountedPrice } from '../../../utils';

const AllCategoriesScreen = ({ navigation, route, onServicePress }) => {
  //Data Fetching Hook
  const { data: services } = useCustomQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const renderServiceItem = ({ item, index }) => {
    const { salePrice, actualPrice } = discountedPrice(
      item?.price,
      item?.discount,
    );
    return (
      <TouchableOpacity
        onPress={() => {
          if (route.params?.nextScreen) {
            navigation.navigate(route.params.nextScreen, {
              serviceId: item.id,
            });
          } else {
            navigation.navigate('ServiceDetailsScreen', {
              serviceDetail: item,
            });
          }
        }}
        activeOpacity={BASEOPACITY}
      >
        <Flex
          direction="column"
          extraStyle={{
            backgroundColor: COLORS.surface3,
            borderRadius: 12,
          }}
        >
          <Flex extraStyle={{ position: 'relative' }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 160,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                resizeMode: 'cover',
                position: 'relative',
              }}
            />
            <View
              style={{
                borderRadius: 100,
                backgroundColor: COLORS.white100,
                width: Sizer.hSize(45),
                height: Sizer.hSize(45),
                borderWidth: Sizer.hSize(1),
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: Sizer.vSize(-27),
                left: Sizer.vSize(16),
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{ height: Sizer.hSize(30), width: Sizer.hSize(30) }}
                resizeMode="contain"
              />
            </View>
          </Flex>

          <Flex
            direction="column"
            extraStyle={{
              padding: Sizer.hSize(16),
            }}
          >
            <Flex gap={4} extraStyle={{ alignSelf: 'flex-end' }}>
              <Image
                source={star}
                style={{ ...styles.time }}
                resizeMode="contain"
              />
              <Typography
                size={14}
                color={COLORS.grey100}
                fFamily="poppinsMedium500"
              >
                {item.name}
              </Typography>
            </Flex>
            <Flex
              jusContent="space-between"
              algItems="center"
              mT={9}
              mB={8}
              extraStyle={{
                width: '100%',
              }}
            >
              <Typography size={16} fFamily="poppinsSemiBold600">
                {item.title}
              </Typography>
              <Flex algItems={'center'}>
                <Typography
                  size={24}
                  numberOfLines={1}
                  fFamily="poppinsBold700"
                  adjustsFontSizeToFit
                  color={COLORS.secondary}
                >
                  ${salePrice + ' '}
                  {salePrice < actualPrice && (
                    <Typography
                      size={16}
                      style={{ textDecorationLine: 'line-through' }}
                    >
                      ${actualPrice}
                    </Typography>
                  )}
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <Container isPadding={false} isPaddingVertical={false}>
      <Header type="app" title={route.params?.title || 'All Services'} />
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Sizer.vSize(50),
        }}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: Sizer.vSize(8) }} />
        )}
        style={{
          ...GLOBALSTYLE.paddingHor,
          marginTop: Sizer.vSize(42),
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  time: {
    width: Sizer.vSize(15),
    height: Sizer.vSize(15),
  },
});
export default AllCategoriesScreen;
