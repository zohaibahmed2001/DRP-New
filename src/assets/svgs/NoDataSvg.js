import * as React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { COLORS } from '../../globalStyle/Theme';

const NoDataSvg = ({ size = 200, color = COLORS.secondary }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle with Soft Stroke */}
    <Circle
      cx="60"
      cy="60"
      r="58"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.2"
    />

    {/* Main Document / Folder Body */}
    <Path
      d="M85 35H45C41.6863 35 39 37.6863 39 41V79C39 82.3137 41.6863 85 45 85H85C88.3137 85 91 82.3137 91 79V41C91 37.6863 88.3137 35 85 35Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Folded Corner Effect or Tab */}
    <Path
      d="M39 48H31C29.3431 48 28 49.3431 28 51V73C28 74.6569 29.3431 76 31 76H39"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.4"
    />

    {/* Empty Lines inside */}
    <Path
      d="M51 52H79"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    <Path
      d="M51 60H71"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    <Path
      d="M51 68H75"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.3"
    />

    {/* Decorative Element - Bottom Right Reflection/Accent */}
    <Path
      d="M80 85L95 100"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.2"
    />
    <Circle cx="98" cy="103" r="3" fill={color} opacity="0.1" />
  </Svg>
);

export default NoDataSvg;
