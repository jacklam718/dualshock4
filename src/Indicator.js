import React, { PureComponent } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { deviceWidth } from './env';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    borderRadius: 10 / 2,
    margin: 6,
    backgroundColor: '#fff',
  },
});

export default class Indicator extends PureComponent {
  render() {
    const { progress, count, style } = this.props;
    const dots = [];
    for (let i = 0; i < count; i++) {
      const inputRange = [deviceWidth * (i-1), deviceWidth * i, deviceWidth * (i+1)];
      const size = progress.interpolate({
        inputRange,
        outputRange: [5, 10, 5],
      });
      const opacity = progress.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
      });
      dots.push((
        <Animated.View
          key={`indicator-${i}`}
          style={StyleSheet.flatten([
            styles.dot,
            { opacity },
            { width: size, height: size },
          ])}
        >
          <View style={styles.dotInner} />
        </Animated.View>
      ));
    }
    return (
      <View style={StyleSheet.flatten([styles.container, style])}>
        {dots}
      </View>
    )
  }
}