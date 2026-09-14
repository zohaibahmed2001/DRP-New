import React from 'react';
import { Image } from 'react-native';
import { drpLogo } from '../images';

function MainLogoSvg(props) {
  const { width, height, style, ...rest } = props;
  return (
    <Image
      source={drpLogo}
      style={[{ width: width || 140, height: height || 65 }, style]}
      resizeMode="contain"
      {...rest}
    />
  );
}

export default MainLogoSvg;
