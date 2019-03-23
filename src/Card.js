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


const CARD_WIDTH = DEVICE_WIDTH * 0.85;
const CARD_HEIGHT = DEVIC_HEIGHT * 0.65;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

const isAndroid = Platform.OS === 'android';

type Props = {
  scrollX: Object;
  index: number;
  children: any;
  style?: any;
}

export default class Card extends Component {
  static defaultProps = {
    style: null,
  };

  render() {
    const {
      title,
      price,
      image,
      description,
      scrollX,
      children,
      style,
      index
    } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          style,
        ]}
      >
        {/* <Animated.View
          style={{
            marginBottom: 10,
            transform: [{
              translateX: scrollX.interpolate({
                inputRange: [
                  DEVICE_WIDTH * index,
                  DEVICE_WIDTH * (index + 1),
                ],
                outputRange: [0, -DEVICE_WIDTH * 0.1],
              }),
            }],
          }}
        >
          <Text
            style={[
              {
                fontFamily: 'Helvetica',
                fontWeight: '400',
                fontSize: 24,
                color: '#000',
                lineHeight: 29,
              },
            ]}
          >
            MAGMA RED
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{
              translateX: scrollX.interpolate({
                inputRange: [
                  DEVICE_WIDTH * index,
                  DEVICE_WIDTH * (index + 1),
                ],
                outputRange: [0, -DEVICE_WIDTH * 0.35],
              }),
            }],
          }}
        >
          <Text
            style={[
              {
                fontFamily: 'Helvetica',
                fontWeight: '400',
                fontSize: 18,
                color: '#929292',
                lineHeight: 22,
              },
            ]}
          >
            $64.00
          </Text>
        </Animated.View>
        <Animated.View
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={[
            styles.imageContainer,
            { marginTop: DEVIC_HEIGHT * 0.08 },
            {
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: [
                    DEVICE_WIDTH * index,
                    DEVICE_WIDTH * (index + 1),
                  ],
                  outputRange: [0, -DEVICE_WIDTH * 0.5],
                }),
              }],
            }
          ]}
        >
          <Image
            resizeMode="contain"
            source={image}
          />
        </Animated.View>
        <Animated.View
        >
          <Button
            text="BUY"
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{
              translateX: scrollX.interpolate({
                inputRange: [
                  DEVICE_WIDTH * index,
                  DEVICE_WIDTH * (index + 1),
                ],
                outputRange: [0, -DEVICE_WIDTH * 0.2],
              }),
            }],
          }}
        >
          <Text
            style={[
              {
                fontFamily: 'Helvetica',
                fontWeight: '400',
                fontSize: 14,
                color: '#000',
                opacity: 0.6,
                lineHeight: 27,
              },
            ]}
          >
            DUALSHOCK 4
          </Text>
        </Animated.View> */}
        {children}
      </Animated.View>
    );
  }
}

