import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
//----
import {
  Container,
  Flex,
  Typography,
  Paragraph,
} from '../../../atomComponents';
import { COLORS, GLOBALSTYLE, WINDOW } from '../../../globalStyle/Theme';
import { Header } from '../../../components';
import Sizer from '../../../helpers/Sizer';
import { getEstimateRequests } from '../../../api/bookingService';
import { useCustomQuery } from '../../../query/useCustomQuery';
import Icon from '../../../helpers/Icon';
import ListEmpty from '../../../atomComponents/ListEmpty';
import { ActivityIndicator } from 'react-native-paper';
import NoDataSvg from '../../../assets/svgs/NoDataSvg';

const EstimateListingScreen = ({ navigation }) => {
  const { data: estimates, isLoading } = useCustomQuery({
    queryKey: ['estimateRequests'],
    queryFn: getEstimateRequests,
  });
  //   console.log('🚀 ~ EstimateListingScreen ~ estimates:', estimates);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Flex jusContent="space-between" algItems="center" mB={12}>
        <Typography size={12} color={COLORS.grey500} fFamily="poppinsMedium500">
          Request ID #{item?.id}
        </Typography>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item?.is_replied
                ? COLORS.green + '20'
                : COLORS.secondary + '20',
              borderColor: item?.is_replied ? COLORS.green : COLORS.secondary,
              borderWidth: 1,
            },
          ]}
        >
          <Typography
            size={10}
            color={item?.is_replied ? COLORS.green : COLORS.secondary}
            fFamily="poppinsBold700"
            textTransform="uppercase"
          >
            {item?.is_replied ? 'Replied' : 'Pending'}
          </Typography>
        </View>
      </Flex>

      <Flex algItems="center" gap={8} mB={8}>
        <Icon
          name="home-repair-service"
          size={Sizer.fS(18)}
          color={COLORS.secondary}
          iconFamily="MaterialIcons"
        />
        <Typography
          size={16}
          fFamily="poppinsSemiBold600"
          color={COLORS.white100}
        >
          {item?.service_name}
        </Typography>
      </Flex>

      <Paragraph text={item?.description} numberOfLines={5} mB={120} />

      <View style={styles.divider} />

      <Flex jusContent="space-between" algItems="center" mT={8}>
        <Flex algItems="center" gap={4}>
          <Icon
            name="person"
            size={Sizer.fS(14)}
            color={COLORS.grey500}
            iconFamily="MaterialIcons"
          />
          <Typography
            size={12}
            color={COLORS.grey500}
            textTransform={'capitalize'}
          >
            {item?.name}
          </Typography>
        </Flex>
        <Flex algItems="center" gap={4}>
          <Icon
            name="calendar-today"
            size={Sizer.fS(14)}
            color={COLORS.grey500}
            iconFamily="MaterialIcons"
          />
          <Typography size={12} color={COLORS.grey500}>
            {item?.created_at?.split('T')?.[0] || 'N/A'}
          </Typography>
        </Flex>
      </Flex>
    </View>
  );

  return (
    <Container
      isPadding={false}
      isPaddingVertical={false}
      isTextureVisible
      conStyle={{ flexGrow: 1 }}
    >
      <Header type="app" title="My Estimates" />
      {isLoading ? (
        <View style={GLOBALSTYLE.loadingContainer}>
          <ActivityIndicator size={30} color={COLORS.secondary} />
        </View>
      ) : (
        <FlatList
          data={estimates?.data || []}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizer.vSize(200),
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
                No Estimates Found
              </Typography>
              <Typography
                size={14}
                color={COLORS.grey500}
                textAlign="center"
                mT={8}
                style={{ maxWidth: '80%' }}
              >
                You haven't requested any estimates yet. Request your first
                estimate now!
              </Typography>
            </View>
          }
          style={{ marginTop: Sizer.vSize(20) }}
          ItemSeparatorComponent={() => (
            <View style={{ height: Sizer.vSize(16) }} />
          )}
        />
      )}
    </Container>
  );
};

export default EstimateListingScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface3,
    borderRadius: Sizer.hSize(12),
    padding: Sizer.vSize(16),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: Sizer.hSize(8),
    paddingVertical: Sizer.vSize(4),
    borderRadius: Sizer.fS(4),
    boxShadow: '1px 1px 2px rgba(61, 59, 59, 0.3)',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey100,
    marginVertical: Sizer.vSize(4),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Sizer.vSize(100),
  },
});
