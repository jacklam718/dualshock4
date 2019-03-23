import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    borderRadius: 17/2,
    margin: 6,
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  }
});

function Dot({ style }) {
  return <Animated.View style={[styles.dot, style]} />;
}

export default function Indicator ({ scrollX, count, index, style, }) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const scale = scrollX.interpolate({
      // inputRange: [0, 375 * index],
      inputRange: [
        375 * (i-1),
        375 * (i),
        375 * (i+1),
      ],
      outputRange: [6, 10, 6],
    });
    dots.push(
      <Dot
        key={`dot-${i}`}
        style={{
          width: scale,
          height: scale,
        }}
      />
    );
  }
  return (
    <View style={[styles.container, style]}>
      {dots}
    </View>
  );
}