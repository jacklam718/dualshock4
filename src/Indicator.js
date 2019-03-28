import React, { Component } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
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

export default function Indicator({ progress, count, style }) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const inputRange = [DEVICE_WIDTH * (i-1), DEVICE_WIDTH * i, DEVICE_WIDTH * (i+1)];
    const size = progress.interpolate({
      inputRange,
      outputRange: [6, 10, 6],
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
  );
}