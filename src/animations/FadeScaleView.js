import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const FadeScaleView = ({
  children,
  duration = 1000,
  delay = 0,
  initialScale = 0.5,
}) => {
  const scale = useSharedValue(initialScale);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.out(Easing.back(1.5)),
      }),
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
      }),
    );
  }, [delay, duration, initialScale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default FadeScaleView;
