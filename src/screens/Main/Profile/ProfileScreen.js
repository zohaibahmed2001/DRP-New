import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

//----
import { Container, Flex, Typography } from '../../../atomComponents';
import { avatar, edit as Edit } from '../../../assets/images';
import { BASEOPACITY, COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Button, Header } from '../../../components';
import Icon from '../../../helpers/Icon';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { handleLogout } from '../../../redux/slices/appSlice';
import { deleteAcount, logout } from '../../../api/userService';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { queryClient } from '../../../api/api';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.app);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  function clearApp() {
    queryClient.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      }),
    );
  }

  //Custom Logout Query Hook
  const { refetch: triggerLogout } = useCustomQuery({
    queryKey: ['logout'],
    queryFn: logout,
    enabled: false,
  });

  //Custom Delete Account Query Hook
  const { refetch: triggerDeleteAccount, isLoading: isDeleting } = useCustomQuery({
    queryKey: ['delete'],
    queryFn: deleteAcount,
    enabled: false,
  });

  // Request Logout:
  const logoutHandler = () => {
    clearApp();
    triggerLogout().then(() => {
      dispatch(handleLogout());
    });
  };

  // Request Delete Account:
  const handleDeleteAccount = async () => {
    try {
      await triggerDeleteAccount();
    } catch (e) {
      console.log('Error deleting account:', e);
    }
    setDeleteModalVisible(false);
    clearApp();
    triggerLogout().finally(() => {
      dispatch(handleLogout());
    });
  };

  const ProfileMenuItem = ({ label, icon, iconFamily, onPress, color, iconColor }) => (
    <TouchableOpacity
      activeOpacity={BASEOPACITY}
      onPress={onPress}
      style={styles.menuItem}
    >
      <Flex algItems="center" gap={12}>
        <View style={styles.iconCircle}>
          <Icon
            name={icon}
            iconFamily={iconFamily}
            size={Sizer.fS(20)}
            color={iconColor || color || COLORS.secondary}
          />
        </View>
        <Typography
          fFamily="poppinsMedium500"
          size={16}
          color={color || COLORS.white100}
        >
          {label}
        </Typography>
      </Flex>
      <Icon
        name="chevron-right"
        iconFamily="Feather"
        size={Sizer.fS(20)}
        color={COLORS.grey400}
      />
    </TouchableOpacity>
  );

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: Sizer.hSize(100) }}
      >
        <Flex algItems={'center'} direction={'column'} mT={40} mb={30}>
          <Avatar.Image
            source={{ uri: user?.image }}
            size={Sizer.hSize(100)}
            style={{ backgroundColor: 'grey' }}
          />
          <Typography
            size={22}
            mT={15}
            fFamily="interTightSemiBold600"
            color={COLORS.white100}
            textTransform="capitalize"
          >
            {user?.name || 'User Name'}
          </Typography>
          <Typography
            size={14}
            mT={4}
            fFamily="poppinsRegular400"
            color={COLORS.grey300}
          >
            {user?.email || 'user@example.com'}
          </Typography>
        </Flex>

        <View style={styles.menuContainer}>
          <ProfileMenuItem
            label="Profile Details"
            icon="user"
            iconFamily="Feather"
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
          <ProfileMenuItem
            label="Log out"
            icon="logout"
            iconFamily="MaterialIcons"
            onPress={logoutHandler}
            color={COLORS.red}
          />
          <ProfileMenuItem
            label="Delete Account"
            icon="trash-2"
            iconFamily="Feather"
            onPress={() => setDeleteModalVisible(true)}
            color={COLORS.red}
            iconColor={COLORS.red}
          />
        </View>
      </ScrollView>

      <Modal
        visible={deleteModalVisible}
        statusBarTranslucent
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surface3,
              marginHorizontal: 20,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 12,
              width: '90%',
            }}
          >
            <Typography
              textAlign="center"
              fFamily="interTightSemiBold600"
              size={20}
              color={COLORS.white100}
            >
              Are you sure you want to delete your account?
            </Typography>

            <Typography
              size={14}
              textAlign="center"
              color={COLORS.grey200}
              mT={10}
            >
              This action is permanent and cannot be undone.
            </Typography>

            <Flex gap={12} mT={30}>
              <Button
                btnStyle={{ flex: 1 }}
                label="Delete"
                type="primary"
                textColor={COLORS.red}
                onPress={handleDeleteAccount}
                loadColor={COLORS.red}
                loader={isDeleting}
              />
              <Button
                btnStyle={{ flex: 1 }}
                label="Cancel"
                type="secondary"
                onPress={() => setDeleteModalVisible(false)}
                disabled={isDeleting}
              />
            </Flex>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: Sizer.vSize(20),
    gap: Sizer.vSize(15),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface3,
    padding: Sizer.fS(12),
    borderRadius: Sizer.fS(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircle: {
    width: Sizer.fS(40),
    height: Sizer.fS(40),
    borderRadius: Sizer.fS(20),
    backgroundColor: `${COLORS.grey400}30`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
