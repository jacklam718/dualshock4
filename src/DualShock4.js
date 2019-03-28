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
import { deviceWidth, deviceHeight } from './env';
import Card from './Card';
import Button from './Button';
import Indicator from './Indicator';

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
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
    x: 0,
    y: 0,
  });

  titleTranslateX = new Animated.Value(0);
  imageRotate = new Animated.Value(0);
  imageTranslateY = new Animated.Value(0);
  imageScale = new Animated.Value(0);
  footerImageScale = new Animated.Value(0);
  paragraphOpacity = new Animated.Value(0);

  previewTextOpacity = new Animated.Value(1);
  activeTextOpacity = new Animated.Value(0);

  inputRange = [
    deviceWidth * this.props.index,
    deviceWidth * (this.props.index + 1),
  ];

  state = {
    isActive: false,
    width: 0,
    height: 0,
  }

  showDetails = () => {
    if (this.state.isActive) {
      this.setState({
        isActive: false,
      }, () => {
        this.props.onClose(this.props.index);
        Animated.parallel([
          Animated.timing(this.cardSize.x, {
            toValue: this.state.width,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: this.state.height,
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
            toValue: deviceWidth,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: deviceHeight,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.spring(this.titleTranslateX, {
            toValue: deviceHeight,
            friction: 4.5,
            tension: 0.5,
            useNativeDriver: true,
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: deviceHeight/2,
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
    return !this.state.isActive ? (
      <Animated.View
        style={{
          opacity: this.previewTextOpacity,
          transform: [{
            translateX: this.props.scrollX.interpolate({
              inputRange: this.inputRange,
              outputRange: [0, -deviceWidth * 0.1],
            }),
          }],
        }}
      >
        <Heading3>
          MAGMA RED
        </Heading3>
      </Animated.View>
    ) : null;
  }

  renderPreviewPrice() {
    return !this.state.isActive ? (
      <Animated.View
        style={{
          opacity: this.previewTextOpacity,
          transform: [{
            translateX: this.props.scrollX.interpolate({
              inputRange: this.inputRange,
              outputRange: [0, -deviceWidth * 0.4],
            }),
          }],
        }}
      >
        <Heading4>
          {this.props.item.price}
        </Heading4>
      </Animated.View>
    ) : null;
  }

  renderPreviewName() {
    return !this.state.isActive ? (
      <Animated.View
        style={{
          opacity: this.previewTextOpacity,
          transform: [{
            translateX: this.props.scrollX.interpolate({
              inputRange: this.inputRange,
              outputRange: [0, -deviceWidth * 0.2],
            }),
          }],
        }}
      >
        <Heading5>
          {this.props.item.name}
        </Heading5>
      </Animated.View>
    ) : null
  }

  renderDetailTitle() {
    return (
      <View
        style={{
          position: 'absolute', 
          top: 150,
          left: 0
        }}
      >
        <Animated.View
          style={{
            marginBottom: 66,
            opacity: this.state.isActive ? 1 : 0,
            transform: [{
              translateX: this.titleTranslateX.interpolate({
                inputRange: [0, deviceHeight],
                outputRange: [-deviceWidth, 0],
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
                inputRange: [this.state.height, deviceHeight],
                outputRange: [-deviceWidth, 0],
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
              inputRange: [this.state.height, deviceHeight],
              outputRange: [0, 100],
            }),
          }, {
            translateY: this.cardSize.y.interpolate({
              inputRange: [this.state.height, deviceHeight],
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

  adjustContentSize = (e) => {
    const isAdjusted = !!(this.state.width && this.state.height);
    if (isAdjusted) {
      return;
    }
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      width,
      height,
    }, () => {
      this.cardSize.setValue({
        x: width,
        y: height,
      });
    });
  }

  render() {
    const { scrollX, index, item } = this.props;
    const { width, height } = this.state;
    const cardSize = !(width && height)
      ? null
      : {
          width: this.cardSize.x,
          height: this.cardSize.y,
        };
    
    return (
      <Card
        onLayout={this.adjustContentSize}
        style={StyleSheet.flatten([
          cardSize,
          {
            borderRadius: this.cardSize.y.interpolate({
              inputRange: [height, deviceHeight],
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
            {
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0, -deviceWidth * 0.5],
                }),
              }, {
                translateY: this.imageTranslateY.interpolate({
                  inputRange: [0, deviceHeight/2],
                  outputRange: [0, -deviceHeight/2],
                }),
              }, {
                rotate: this.imageRotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              }, {
                scale: this.imageTranslateY.interpolate({
                  inputRange: [0, deviceHeight/2],
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
                inputRange: [height, deviceHeight],
                outputRange: [0, -60],
              }),
            }, {
              translateY: this.cardSize.y.interpolate({
                inputRange: [height, deviceHeight],
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
        {this.renderPreviewName()}
        {this.renderDetailFooterImage()}
      </Card>
    );
  }
}