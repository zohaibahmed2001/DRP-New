import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//------------
import { COLORS } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import { useKeyboard } from '../hooks/useKeyboard';
import { Typography } from '../atomComponents';
import {
  EstimateListingScreen,
  AdminChatScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import HomeSvg from '../assets/svgs/HomeSvg';
import ChatSvg from '../assets/svgs/ChatSvg';
import ProfileSvg from '../assets/svgs/ProfileSvg';
import BookingSvg from '../assets/svgs/BookingSvg';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { keyboardOpen } = useKeyboard();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => (!keyboardOpen ? <MyTabBar {...props} /> : null)}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Estimates" component={EstimateListingScreen} />
      <Tab.Screen name="Chat" component={AdminChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.conStyle}>
      <View style={styles.menuContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;
          const isFocused = state.index === index;

          const icons = {
            Home: <HomeSvg active={isFocused} />,
            Estimates: <BookingSvg active={isFocused} />,
            Chat: <ChatSvg active={isFocused} />,
            Profile: <ProfileSvg active={isFocused} />,
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.menuItem}
              onPress={() => {
                if (route.name === 'Chat') {
                  navigation.navigate('AdminChatScreen');
                } else {
                  navigation.navigate(route.name);
                }
              }}
              activeOpacity={0.8}
            >
              {icons[route.name]}
              <View style={styles.labelContainer}>
                <Typography
                  fFamily={isFocused ? 'poppinsMedium500' : 'poppinsRegular400'}
                  size={12}
                  numberOfLines={1}
                  color={COLORS.white100}
                  LineHeight={22}
                >
                  {label}
                </Typography>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conStyle: {
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    // paddingBottom: Platform.select({
    //   android: Sizer.vSize(30),
    //   ios: Sizer.vSize(30),
    // }),
    height: Sizer.hSize(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: Sizer.vSize(5),
  },
});

export default BottomNavigator;
