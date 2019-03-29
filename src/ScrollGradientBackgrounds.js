import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet } from 'react-native';
import { deviceWidth, deviceHeight, isIOS } from './env';

export default class ScrollGradientBackgrounds extends PureComponent {
  static propTypes = {
    scrollX: PropTypes.object.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    style: null,
  };

  render() {
    const { scrollX, colors } = this.props;
    return (
      <View style={StyleSheet.flatten(StyleSheet.absoluteFill)}>
        {colors.map((color, index) => (
          <Animated.View
            key={`gb-${index}`}
            style={StyleSheet.flatten([
              StyleSheet.absoluteFill,
              {
                backgroundColor: color,
                zIndex: -index,
                opacity: scrollX.interpolate({
                  inputRange: [deviceWidth * index, deviceWidth * (index + 1)],
                  outputRange: isIOS ? [1, 0] : [1, 2],
                }),
              },
            ])}
          />
        ))}
      </View>
    );
  }
}