// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Button from './Button';

const {
  width: DEVICE_WIDTH,
  height: DEVIC_HEIGHT,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.85,
    height: DEVIC_HEIGHT * 0.65,
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

export default function Card({ style, children }) {
  return (
    <Animated.View
      style={[
        styles.container,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

