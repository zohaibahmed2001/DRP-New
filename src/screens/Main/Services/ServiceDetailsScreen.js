import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
//---------
import { Container, Flex, Typography } from "../../../atomComponents";
import { star } from "../../../assets/images";
import { Button, Header } from "../../../components";
import { COLORS, GLOBALSTYLE } from "../../../globalStyle/Theme";
import Sizer from "../../../helpers/Sizer";
import { Divider } from "react-native-paper";
import { SubTitle } from "../../../components/Text/SubTitle";
import { discountedPrice } from "../../../utils/index";
import ImageGrid from "../../../components/imagePicker/ImageGrid";
import StarFilter from "../../_partials/Service/StarFilter";
import { ReviewsList } from "../Review/ReviewsList";
import { useCustomQuery } from "../../../query/useCustomQuery";
import { getServiceDetails } from "../../../api/bookingService";

import { getConfig } from "../../../api/generalService";

import Icon from "../../../helpers/Icon";

const ServiceDetailsScreen = ({ navigation, route }) => {
  const serviceDetail = route.params?.serviceDetail;

  const [selectedRating, setSelectedRating] = useState("all");

  //reviews Query Hook:
  const { data: reviewsData, isLoading } = useCustomQuery({
    queryKey: ["serviceDetails", serviceDetail?.id, selectedRating],
    queryFn: ({ signal, queryKey }) =>
      getServiceDetails(signal, queryKey[1], queryKey[2]),
  });

  //Config Query Hook
  const { data: configData } = useCustomQuery({
    queryKey: ["config"],
    queryFn: getConfig,
  });

  const { salePrice, actualPrice } = discountedPrice(
    serviceDetail?.price,
    serviceDetail?.discount,
  );

  const noOfReviews =
    reviewsData?.reviewsCount > 999
      ? reviewsData?.reviewsCount / 1000 + "k"
      : reviewsData?.reviewsCount;

  return (
    <Container isPaddingVertical={false} isPadding={false} isTextureVisible>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={{ uri: serviceDetail?.image }}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <Header isBackGreen />
        </ImageBackground>
        <View style={GLOBALSTYLE.paddingHor}>
          <Flex mT={28} jusContent={"space-between"} gap={12} algItems="center">
            <Flex direction={"column"} flex={1}>
              <Typography
                size={22}
                numberOfLines={2}
                fFamily="interTightBold700"
                style={{ maxWidth: "80%" }}
                textTransform={"capitalize"}
                LineHeight={24}
                color={COLORS.white100}
              >
                {serviceDetail?.name}
              </Typography>
              {serviceDetail?.slot && (
                <Flex algItems={"center"} mT={9} jusContent={"space-between"}>
                  <Flex gap={6}>
                    <Image
                      source={star}
                      style={styles.time}
                      resizeMode="contain"
                    />
                    <Typography
                      size={14}
                      fFamily="poppinsMedium500"
                      color={COLORS.grey100}
                    >
                      {serviceDetail?.slot}
                    </Typography>
                  </Flex>
                </Flex>
              )}
            </Flex>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (configData?.data?.phone) {
                  Linking.openURL(`tel:${configData?.data?.phone}`);
                }
              }}
              style={styles.callButton}
            >
              <Icon
                name="call"
                iconFamily="Ionicons"
                size={Sizer.fS(24)}
                color={COLORS.secondary}
              />
            </TouchableOpacity> */}
          </Flex>
          <Divider style={styles.separator} />

          <SubTitle mTitle="About Service" />

          <Typography size={14} mT={5} color={COLORS.grey100} LineHeight={22}>
            {serviceDetail?.description}
          </Typography>

          {serviceDetail?.multiple_images && (
            <>
              <SubTitle
                mTitle="Photos"
                onSeeAllPress={() =>
                  navigation.navigate("ServicePhotosScreen", {
                    serviceImages: serviceDetail?.multiple_images,
                  })
                }
                isSeeAllTextVisible
                // isSeeAllTextVisible={serviceDetail?.multiple_images?.length > 6}
              />
              <ImageGrid
                images={serviceDetail?.multiple_images?.slice(0, 6) || []}
              />
            </>
          )}
          {/* HIDE CODE ON DEMAND */}
          {/* <SubTitle
            mTitle={
              <>
                <Image
                  source={star}
                  style={{ ...styles.time, marginRight: Sizer.vSize(60) }}
                  resizeMode="contain"
                />{' '}
                {parseFloat(reviewsData?.reviewsAverage || 0).toFixed(1)} (
                {noOfReviews || 0} reviews)
              </>
            }
            isSeeAllTextVisible
            onSeeAllPress={() =>
              navigation.navigate('ServiceReviewsScreen', {
                serviceId: serviceDetail?.id,
              })
            }
          />

          <StarFilter
            onFilterChange={rating => {
              setSelectedRating(rating);
            }}
          />
          <ReviewsList
            selectedRating={selectedRating}
            reviewsData={reviewsData?.reviews || []}
          /> */}
          <Flex gap={12} mT={32}>
            <Button
              label="Request an Estimate"
              btnStyle={{
                flex: 1,
                backgroundColor: COLORS.surface3,
                borderColor: COLORS.secondary,
                borderWidth: 1,
              }}
              textColor={COLORS.secondary}
              type={"secondary"}
              onPress={() =>
                navigation.navigate("EstimateFormScreen", {
                  service: serviceDetail,
                })
              }
            />
          </Flex>
          <Flex gap={12}>
            <Button
              label="Chat With Us"
              btnStyle={{ flex: 1 }}
              type={"secondary"}
              mt={12}
              onPress={() =>
                navigation.navigate("BookingChatScreen", {
                  booking_id: serviceDetail?.id,
                  bookingStatus: serviceDetail?.status,
                })
              }
            />
            <Button
              label="Call Us"
              btnStyle={{ flex: 1 }}
              type={"secondary"}
              mt={12}
              onPress={() => {
                if (configData?.data?.phone) {
                  Linking.openURL(`tel:${configData?.data?.phone}`);
                }
              }}
            />
          </Flex>

          <View style={styles.disclosureBox}>
            <Typography
              size={14}
              color={"rgba(205, 175, 7, 1)"}
              fFamily="poppinsRegular400"
              textAlign="center"
            >
              Please note that responses will be provided by the end of the next
              business day.
            </Typography>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  headerBackground: {
    height: Sizer.vSize(377),
    borderBottomLeftRadius: Sizer.hSize(24),
    borderBottomRightRadius: Sizer.hSize(24),
    overflow: "hidden",
    paddingHorizontal: Sizer.hSize(24),
    paddingTop: Sizer.vSize(24),
    alignItems: "center",
  },
  time: {
    width: Sizer.vSize(15),
    height: Sizer.vSize(15),
  },
  separator: {
    marginTop: Sizer.vSize(20),
  },
  scrollView: {
    paddingBottom: Sizer.vSize(32),
  },
  callButton: {
    padding: Sizer.fS(8),
    backgroundColor: COLORS.white100,
    borderRadius: Sizer.fS(10),
  },
  disclosureBox: {
    marginTop: Sizer.vSize(20),
    paddingHorizontal: Sizer.hSize(24),
  },
});
