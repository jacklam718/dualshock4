import React, { Component } from 'react';
import {
  Image,
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Slider,
} from 'react-native';
import {
  HeaderTitle,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Paragraph
} from './Text';
import Card from './Card';
import Button from './Button';
import Indicator from './Indicator';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const {
  width: DEVICE_WIDTH,
  height: DEVIC_HEIGHT,
} = Dimensions.get('window');

const CARD_WIDTH = DEVICE_WIDTH * 0.85;
const CARD_HEIGHT = DEVIC_HEIGHT * 0.65;

const styles = StyleSheet.create({
  page: {
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default class DualShock4 extends Component {
  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
  }

  cardSize = new Animated.ValueXY({
    x: CARD_WIDTH,
    y: CARD_HEIGHT,
  });

  // animatedButton = 
  titleTranslateX = new Animated.Value(0);
  imageRotate = new Animated.Value(0);
  imageTranslateY = new Animated.Value(0);
  imageScale = new Animated.Value(0);
  footerImageScale = new Animated.Value(0);
  paragraphOpacity = new Animated.Value(0);

  previewTextOpacity = new Animated.Value(1);
  activeTextOpacity = new Animated.Value(0);

  inputRange = [
    DEVICE_WIDTH * this.props.index,
    DEVICE_WIDTH * (this.props.index + 1),
  ];

  state = {
    isActive: false,
  }

  showDetails = () => {
    if (this.state.isActive) {
      this.setState({
        isActive: false,
      }, () => {
        this.props.onClose(this.props.index);
        Animated.parallel([
          Animated.timing(this.cardSize.x, {
            toValue: CARD_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: CARD_HEIGHT,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.spring(this.titleTranslateX, {
            toValue: 0,
            friction: 4.5,
            tension: 0.5,
            useNativeDriver: true,
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(this.imageRotate, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(this.footerImageScale, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 1,
            duration: 200,
            delay: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      this.props.onOpen(this.props.index);
      this.setState({
        isActive: true,
      }, () => {
        Animated.parallel([
          Animated.timing(this.cardSize.x, {
            toValue: DEVICE_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: DEVIC_HEIGHT,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.spring(this.titleTranslateX, {
            toValue: DEVIC_HEIGHT,
            friction: 4.5,
            tension: 0.5,
            useNativeDriver: true,
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: DEVIC_HEIGHT/2,
            useNativeDriver: true,
          }),
          Animated.timing(this.imageRotate, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(this.footerImageScale, {
            toValue: 1,
            friction: 5.5,
            tension: 10,
            useNativeDriver: true,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 1,
            duration: 200,
            delay: 300,
            useNativeDriver: false,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }

  renderPreviewTitle() {
    return (
      <Animated.View
        style={{
          top: 50,
          position: 'absolute',
          opacity: this.previewTextOpacity,
          transform: [{
            translateX: this.props.scrollX.interpolate({
              inputRange: this.inputRange,
              outputRange: [0, -DEVICE_WIDTH * 0.1],
            }),
          }],
        }}
      >
        <Heading3>
          MAGMA RED
        </Heading3>
      </Animated.View>
    );
  }

  renderPreviewPrice() {
    return (
      <Animated.View
        style={{
          top: 90,
          position: 'absolute',
          opacity: this.previewTextOpacity,
          // height: 40,
          transform: [{
            translateX: this.props.scrollX.interpolate({
              inputRange: this.inputRange,
              outputRange: [0, -DEVICE_WIDTH * 0.4],
            }),
          }],
        }}
      >
        <Heading4>
          {this.props.item.price}
        </Heading4>
      </Animated.View>
    );
  }

  renderDetailTitle() {
    return (
      <View
        style={{
          position: 'absolute', 
          top: 160,
          left: 0
        }}
      >
        <Animated.View
          style={{
            marginBottom: 66,
            opacity: this.state.isActive ? 1 : 0,
            transform: [{
              translateX: this.titleTranslateX.interpolate({
                inputRange: [0, DEVIC_HEIGHT],
                outputRange: [-300, 0],
              }),
            }],
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={{ position: 'absolute' }}
            source={this.props.item.imageTitle1}
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{
              translateX: this.titleTranslateX.interpolate({
                inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
                outputRange: [-400, 0],
              }),
            }],
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={{ position: 'absolute' }}
            source={this.props.item.imageTitle2}

          />
        </Animated.View>
      </View>
    );
  }

  renderDetailDecription() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          padding: 20,
          top: 140 + 160,
          opacity: this.activeTextOpacity,
        }}
      >
        <Heading4>
          DualShock 4
        </Heading4>
        <Heading1>
          Wireless Controller
        </Heading1>
        <Paragraph>
          The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, precision controls.
        </Paragraph>
      </Animated.View>
    );
  }

  renderDetailPrice() {
    return this.state.isActive ? (
      <Animated.View
        style={{
          opacity: this.activeTextOpacity,
          transform: [{
            translateX: this.cardSize.y.interpolate({
              inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
              outputRange: [0, 100],
            }),
          }, {
            translateY: this.cardSize.y.interpolate({
              inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
              outputRange: [0, 60],
            }),
          }],
        }}
      >
        <Heading2>
          {this.props.item.price}
        </Heading2>
      </Animated.View>
    ) : null;
  }

  renderDetailFooterImage() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          opacity: this.state.isActive ? 1 : 0,
          transform: [{
            scale: this.footerImageScale.interpolate({
              inputRange: [0, 1],
              outputRange: [3, 1],
            })
          }, {
            translateY: this.footerImageScale.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0],
            }),
          }]
        }}
      > 
        <Animated.Image
          resizeMode="contain"
          source={require('../assets/photos.png')}
        />
      </Animated.View>
    )
  }

  render() {
    const { scrollX, index, item } = this.props;

    return (
      <View style={styles.page}>
        <Card
          style={StyleSheet.flatten([
            {
              width: this.cardSize.x,
              height: this.cardSize.y,
            },
            {
              borderRadius: this.cardSize.y.interpolate({
                inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
                outputRange: [15, 0],
              }),
            },
          ])}
        >
          {this.renderPreviewTitle()}
          {this.renderPreviewPrice()}
          <Animated.View
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            style={StyleSheet.flatten([
              styles.imageContainer,
              // { marginTop: DEVIC_HEIGHT * 0.08 },
              { marginTop: this.state.isActive ? 100 : 50 },
              {
                transform: [{
                  translateX: scrollX.interpolate({
                    inputRange: this.inputRange,
                    outputRange: [0, -DEVICE_WIDTH * 0.5],
                  }),
                }, {
                  translateY: this.imageTranslateY.interpolate({
                    inputRange: [
                      0,
                      DEVIC_HEIGHT/2,
                    ],
                    outputRange: [0, -DEVIC_HEIGHT/2],
                  }),
                }, {
                  rotate: this.imageRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                }, {
                  scaleX: this.imageTranslateY.interpolate({
                    inputRange: [0, DEVIC_HEIGHT/2],
                    outputRange: [1, 1.55],
                  }),
                }, {
                  scaleY: this.imageTranslateY.interpolate({
                    inputRange: [0, DEVIC_HEIGHT/2],
                    outputRange: [1, 1.55],
                  }),
                }],
              },
            ])}
          >
            <Animated.Image
              resizeMode="contain"
              source={item.goodsImage}
            />
          </Animated.View>

          {this.renderDetailTitle()}
          {this.renderDetailDecription()}
          
          <Animated.View
            style={{
              transform: [{
                translateX: this.cardSize.y.interpolate({
                  inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
                  outputRange: [0, -60],
                }),
              }, {
                translateY: this.cardSize.y.interpolate({
                  inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
                  outputRange: [0, 100],
                }),
              }],
            }}
          >
            <Button
              text="BUY"
              onPress={this.showDetails}
            />
          </Animated.View>
          
          {this.renderDetailPrice()}

          <Animated.View
            style={{
              opacity: this.previewTextOpacity,
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0, -DEVICE_WIDTH * 0.2],
                }),
              }],
            }}
          >
            <Heading5>
              {item.name}
            </Heading5>
          </Animated.View>

          {this.renderDetailFooterImage()}
        </Card>
      </View>
    );
  }
}