import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native'; 
import GradientBackgrounds from './GradientBackgrounds';
import Indicator from './Indicator';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default class ProductCarousel extends Component {
  scrollX = new Animated.Value(0);

  renderCards() {
    return this.props.products.map((item, index) => {
      return this.props.renderItem({ item, index, scrollX: this.scrollX });
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
            scrollX={this.scrollX}
            count={this.props.products.length}
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
              useNativeDriver: false,
            }
          )}
        >
          {this.renderCards()}
        </Animated.ScrollView>
      </View>
    );
  }
}