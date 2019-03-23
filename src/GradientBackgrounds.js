// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
const isAdroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default function GradientBackgrounds({ scrollX, style, colors }: Props) {
  return (
    <View style={[styles.container, style]}>
      {colors.map((color, index) => (
        <Animated.View
          key={`gb-${index}`}
          style={StyleSheet.flatten([
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: color,
              zIndex: -index,
              opacity: scrollX.interpolate({
                inputRange: [deviceWidth * index, deviceWidth * (index + 1)],
                outputRange: isAdroid ? [1, 2] : [1, 0],
              }),
            },
          ])}
        />
      ))}
    </View>
  );
}

GradientBackgrounds.propTypes = {
  scrollX: PropTypes.object.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.any,
}

GradientBackgrounds.defaultProps = {
  style: null,
}