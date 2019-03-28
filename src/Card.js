import React from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15
    },
  },
});

export default function Card({ style, children, ...props }) {
  return (
    <Animated.View
      {...props}
      style={[
        styles.container,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

