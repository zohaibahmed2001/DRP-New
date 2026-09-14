import { Dimensions } from 'react-native';
import Sizer from '../helpers/Sizer';

const BASEOPACITY = 0.5;

const IMAGEONLOADCOLOR = {
  backgroundColor: 'lightgrey',
};

const COLORS = {
  mainBg: '#1A1A1A', // Content area background
  primary: '#050505', // Nav, sidebar, outermost shell
  secondary: '#FBBC05', // CTAs, active states, accents

  // Surface Layers:
  surface1: '#050505',
  surface2: '#1A1A1A',
  surface3: '#212121',

  // Interaction / Depth:
  border: '#303030',
  hover: '#424242',

  // Black Variants:
  black100: '#050505',
  black200: '#1A1A1A',
  black300: '#212121',
  black400: '#424242',
  black500: '#303030',

  // Grey Variants (Typography Hierarchy):
  grey100: '#C8C8C8', // Body text
  grey200: '#B1B1B1', // Secondary / labels
  grey300: '#989898', // Differentiated
  grey400: '#A0A0A0', // Differentiated from grey200
  grey500: '#818181', // Placeholders / hints

  // White Variants:
  white100: '#FFFFFF', // Headlines / titles
  white200: '#F8F8F8', // Secondary titles
  white300: '#FFFFFF',

  red: '#B90205',
  green: '#1b8567',
  yellow: '#FBBC05',
};

const FONTS = {
  //Font 01

  //Poppins
  poppinsRegular400: 'Poppins-Regular',
  poppinsMedium500: 'Poppins-Medium',
  poppinsSemiBold600: 'Poppins-SemiBold',
  poppinsBold700: 'Poppins-Bold',

  //Font 02
  //Inter Tight
  interTightSemiBold600: 'InterTight-SemiBold',
  interTightBold700: 'InterTight-Bold',

  //Font 03
  //Inter
  interSemiBold600: 'Inter-SemiBold',
};

const WINDOW = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 24,
};

const GLOBALSTYLE = {
  wrap: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  paddingHor: {
    paddingHorizontal: Sizer.hSize(24),
  },
  checkBoxWrapper: {
    width: Sizer.hSize(24),
    height: Sizer.hSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBottomPadding: {
    paddingBottom: Sizer.vSize(100),
  },
  topListBottomMargin: {
    marginBottom: Sizer.vSize(194),
  },
  itemSeparatorVertically: {
    height: Sizer.vSize(16),
  },
  itemSeparatorHorizontally: {
    height: Sizer.vSize(10),
  },
  bgWithOpacity: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { COLORS, WINDOW, FONTS, GLOBALSTYLE, BASEOPACITY, IMAGEONLOADCOLOR };
