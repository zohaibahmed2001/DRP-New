import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
//------
import { Container, Typography } from '../../../atomComponents';
import { Button, Header, TextField } from '../../../components';
import { COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import { useCustomMutation } from '../../../query/useCustomMutation';
import { storeEstimateRequest } from '../../../api/bookingService';
import { maskPhoneNumber, showMessage } from '../../../utils';
import Sizer from '../../../helpers/Sizer';
import FormController from '../../../components/formController/FormController';
import validatoinSchema from '../../../validations';
import { queryClient } from '../../../api/api';

const EstimateFormScreen = ({ navigation, route }) => {
  const service = route.params?.service || '';
  const user = useSelector(state => state.app.user);

  const { mutate: requestEstimate, isPending } = useCustomMutation({
    mutationFn: storeEstimateRequest,
    onSuccess: res => {
      showMessage({
        message: res?.message,
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['estimateRequests'],
      });
      navigation.goBack();
    },
  });

  const handleSubmit = values => {
    const payload = {
      service_id: service?.id,
      ...values,
    };
    requestEstimate(payload);
  };

  return (
    <Container
      isPaddingVertical={false}
      isPadding={false}
      isTextureVisible
      isKeyboardAvoid
    >
      <Header type="app" title="Request Estimate" />
      <ScrollView
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: Sizer.vSize(200) }}
        showsVerticalScrollIndicator={false}
      >
        <FormController
          initialValues={{
            name: user?.name || '',
            phone: user?.phone || '',
            description: '',
          }}
          validationSchema={validatoinSchema.UserValidations.estimateFormSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            values,
            errors,
            handleBlur,
            handleSubmit: submitForm,
          }) => (
            <>
              <Typography
                size={16}
                fFamily="poppinsSemiBold600"
                mT={20}
                mB={8}
                color={COLORS.black300}
              >
                Service
              </Typography>
              <TextField
                value={service?.name}
                disable={false}
                editable={false}
                containerSt={{
                  paddingHorizontal: 4,
                }}
              />

              <Typography
                size={16}
                fFamily="poppinsSemiBold600"
                mT={16}
                mB={8}
                color={COLORS.black300}
              >
                Your Name
              </Typography>
              <TextField
                placeholder="Enter your name"
                value={values.name}
                handleChange={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                containerSt={{
                  paddingHorizontal: 4,
                }}
              />

              <Typography
                size={16}
                fFamily="poppinsSemiBold600"
                mT={16}
                mB={8}
                color={COLORS.black300}
              >
                Phone Number
              </Typography>
              <TextField
                placeholder="123-456-7890"
                onBlur={handleBlur('phone')}
                error={errors.phone}
                keyboardType="phone-pad"
                containerSt={{
                  paddingHorizontal: 4,
                }}
                handleChange={number => {
                  let digits = number?.replace(/\D/g, '');
                  if (digits?.startsWith('1')) {
                    digits = digits.slice(1);
                  }
                  handleChange('phone')(digits);
                }}
                value={maskPhoneNumber(values?.phone)}
                maxLength={17}
              />

              <Typography
                size={16}
                fFamily="poppinsSemiBold600"
                mT={16}
                mB={8}
                color={COLORS.black300}
              >
                Description
              </Typography>
              <TextField
                placeholder="Describe your requirements"
                value={values.description}
                handleChange={handleChange('description')}
                onBlur={handleBlur('description')}
                error={errors.description}
                multiline={true}
                numberOfLines={6}
                maxLength={1000}
                inputStyle={{
                  textAlignVertical: 'top',
                  paddingTop: Sizer.vSize(12),
                  height: Sizer.vSize(120),
                }}
                containerSt={{
                  height: Sizer.vSize(150),
                  alignItems: 'flex-start',
                  paddingHorizontal: 4,
                }}
              />
              <Typography
                size={12}
                color={COLORS.grey500}
                textAlign="right"
                mT={4}
                pR={4}
              >
                {values?.description?.length} / 1000
              </Typography>

              <Button
                label="Submit Estimate Request"
                type="secondary"
                mt={40}
                loader={isPending}
                onPress={submitForm}
              />
            </>
          )}
        </FormController>
      </ScrollView>
    </Container>
  );
};

export default EstimateFormScreen;

const styles = StyleSheet.create({});
