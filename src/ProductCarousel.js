import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Animated, Dimensions, Platform } from 'react-native'; 
import GradientBackgrounds from './GradientBackgrounds';
import Indicator from './Indicator';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const isIphoneX = Platform.OS === 'ios' && (deviceHeight === 812 || deviceWidth === 812);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  indicator: {
    position: "absolute",
    bottom: isIphoneX ? 70 : 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default class ProductCarousel extends Component {
  scrollX = new Animated.Value(0);
  progress = new Animated.Value(0);

  onScroll = (e) => {
    this.progress.setValue(e.nativeEvent.contentOffset.x);
  }

  renderCards() {
    return this.props.products.map((item, index) => {
      return (
        <View key={`page-${index}`} style={styles.page}>
          {this.props.renderItem({ item, index, scrollX: this.scrollX })}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientBackgrounds
          scrollX={this.scrollX}
          colors={this.props.products.map(i => i.color)}
        />

        <View style={styles.indicator}>
          <Indicator
            count={this.props.products.length}
            progress={this.progress}
          />
        </View>

        <Animated.ScrollView
          ref={this.scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          scrollEventThrottle={1}
          onLayout={this.onLayout}
          scrollEnabled={this.props.scrollEnabled}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: this.scrollX },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: this.onScroll,
            }
          )}
        >
          {this.renderCards()}
        </Animated.ScrollView>
      </View>
    );
  }
}