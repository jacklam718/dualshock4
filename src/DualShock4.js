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
  card: {
    borderRadius: 15,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    height: CARD_HEIGHT,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowRadius: 25
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
          Animated.spring(this.cardSize.x, {
            toValue: CARD_WIDTH,
            // friction: 4,
            // tension: 15,
            speed: 12,
          }),
          Animated.spring(this.cardSize.y, {
            toValue: CARD_HEIGHT,
            // friction: 4,
            // tension: 15,
            speed: 12,
          }),
          Animated.spring(this.titleTranslateX, {
            toValue: 0,
            // friction: 1,
            // tension: 1,
            // speed: 12,
            friction: 4.5,
            tension: 0.5,
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: 0,
            friction: 4,
            tension: 15,
          }),
          Animated.spring(this.imageRotate, {
            toValue: 0,
            // friction: 4,
            // tension: 15,
            speed: 12,
          }),
          Animated.spring(this.footerImageScale, {
            toValue: 0,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 1,
            duration: 300,
            delay: 300,
          }),
        ]).start();
      });
    } else {
      this.props.onOpen(this.props.index);
      this.setState({
        isActive: true,
      }, () => {
        Animated.parallel([
          Animated.spring(this.cardSize.x, {
            toValue: DEVICE_WIDTH,
            speed: 12,
          }),
          Animated.spring(this.cardSize.y, {
            toValue: DEVIC_HEIGHT,
            speed: 12,
          }),
          Animated.spring(this.titleTranslateX, {
            toValue: DEVIC_HEIGHT,
            // friction: 1,
            // tension: 1,
            // speed: 12,
            friction: 4.5,
            tension: 0.5,
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: DEVIC_HEIGHT/2,
            friction: 4,
            tension: 15,
            // speed: 12,
          }),
          Animated.spring(this.imageRotate, {
            toValue: 1,
            // friction: 4,
            // tension: 15,
            speed: 12,
          }),
          Animated.spring(this.footerImageScale, {
            toValue: 1,
            friction: 4,
            tension: 1,
            // speed: 12,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 1,
            duration: 300,
            delay: 300,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 0,
            duration: 0,
          }),
        ]).start();
      });
    }

    // setTimeout(() => {
    //   this.setState({
    //     isActive: false,
    //   }, () => {
    //     Animated.parallel([
    //       Animated.spring(this.cardSize.x, {
    //         toValue: CARD_WIDTH,
    //         // friction: 4,
    //         // tension: 15,
    //         speed: 12,
    //       }),
    //       Animated.spring(this.cardSize.y, {
    //         toValue: CARD_HEIGHT,
    //         // friction: 4,
    //         // tension: 15,
    //         speed: 12,
    //       }),
    //       Animated.spring(this.imageTranslateY, {
    //         toValue: 0,
    //         friction: 4,
    //         tension: 15,
    //       }),
    //       Animated.spring(this.imageRotate, {
    //         toValue: 0,
    //         // friction: 4,
    //         // tension: 15,
    //         speed: 12,
    //       }),
    //       Animated.timing(this.paragraphOpacity, {
    //         toValue: 0,
    //         duration: 300,
    //         delay: 300,
    //       }),
    //     ]).start();
    //   });
    // }, 5000);
  }

  render() {
    const { scrollX, index, item } = this.props;

    return (
      <View style={styles.page}>
        <Card
          style={StyleSheet.flatten([
            styles.card,
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
          <Animated.View
            style={{
              // marginTop: 10,
              // marginBottom: 10,
              top: 50,
              position: 'absolute',
              opacity: this.previewTextOpacity,
              transform: [{
                translateX: scrollX.interpolate({
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
          <Animated.View
            style={{
              top: 90,
              position: 'absolute',
              opacity: this.previewTextOpacity,
              height: 40,
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0, -DEVICE_WIDTH * 0.4],
                }),
              }],
            }}
          >
            <Heading4>
              {item.price}
            </Heading4>
          </Animated.View>
          <Animated.View
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            style={StyleSheet.flatten([
              styles.imageContainer,
              // { marginTop: DEVIC_HEIGHT * 0.08 },
              { marginTop: this.state.isActive ? 110 : 50 },
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
              source={item.image}
            />
          </Animated.View>

          <View style={{ position: 'absolute', top: 140, height: 300, left: 0 }}>
            <Animated.View
              style={{
                marginBottom: 66,
                opacity: this.activeTextOpacity,
                transform: [{
                  translateX: this.titleTranslateX.interpolate({
                    inputRange: [0, DEVIC_HEIGHT],
                    outputRange: [-300, 0],
                  }),
                }],
              }}
            >
              <HeaderTitle style={{ position: 'absolute' }}>
                {item.title.split(' ')[0]}
              </HeaderTitle>
            </Animated.View>
            <Animated.View
              style={{
                transform: [{
                  translateX: this.titleTranslateX.interpolate({
                    inputRange: [CARD_HEIGHT, DEVIC_HEIGHT],
                    outputRange: [-500, 0],
                  }),
                }],
              }}
            >
              <HeaderTitle style={{ position: 'absolute' }}>
                {item.title.split(' ')[1]}
              </HeaderTitle>
            </Animated.View>
          </View>

          <Animated.View
            style={{
              position: 'absolute',
              padding: 20,
              top: 140 + 160,
              opacity: this.activeTextOpacity,
              // opacity: this.cardSize.y.interpolate({
              //   inputRange: [-200, DEVIC_HEIGHT],
              //   outputRange: [-10, 1],
              // })
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
          <Animated.View
            style={{
              // flex: 1,
              // flexDirection: 'row',
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
          {
            this.state.isActive ? (
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
                  {item.price}
                </Heading2>
              </Animated.View>
            ) : null
          }
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

          <Animated.View
            style={{
              position: 'absolute',
              bottom: 20,
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

          {/* <Heading5>
            {`${this.state.isActive}`}
          </Heading5> */}
          {/* <Slider
            style={{ width: 200 }}
            onValueChange={(value) => {
              // Animated.parallel([
              //   Animated.spring(this.titleTranslateX, {
              //     toValue: value * DEVIC_HEIGHT,
              //     friction: 4.5,
              //     tension: 0.5,
              //   }),
              // ]).start();
              console.log('value: ', value)
              Animated.parallel([
                Animated.spring(this.cardSize.x, {
                  toValue: Math.max(value * DEVICE_WIDTH, CARD_WIDTH),
                  speed: 100,
                }),
                Animated.spring(this.cardSize.y, {
                  toValue: Math.max(value * DEVIC_HEIGHT, CARD_HEIGHT),
                  speed: 100,
                }),
                Animated.spring(this.titleTranslateX, {
                  toValue: value * DEVIC_HEIGHT,
                  // friction: 1,
                  // tension: 1,
                  // speed: 12,
                  friction: 4.5,
                  tension: 0.5,
                }),
                Animated.spring(this.imageTranslateY, {
                  toValue: Math.max(value * DEVIC_HEIGHT/2, 0),
                  friction: 4,
                  tension: 15,
                  // speed: 12,
                }),
                Animated.spring(this.imageRotate, {
                  toValue: value,
                  // friction: 4,
                  // tension: 15,
                  speed: 12,
                }),
                Animated.timing(this.paragraphOpacity, {
                  toValue: value,
                  delay: 300,
                  duration: 300,
                }),
              ]).start();
            }}
          /> */}
        </Card>
      </View>
    );
  }
}