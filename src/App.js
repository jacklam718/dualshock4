import React from 'react';
import {
  Image,
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { isIphoneX } from './env';
import DualShock4 from './DualShock4';
import ProductCarousel from './ProductCarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: isIphoneX ? 50 : 40,
    right: 25,
  },
});

const products = [
  {
    goodsImage: require('../assets/red.png'),
    imageTitle1: require('../assets/title_wave.png'),
    imageTitle2: require('../assets/title_red.png'),
    color: '#EB4A52',
    title: 'WAWE RED',
    name: 'DUALSHOCK 4',
    price: '$64',
  },
  {
    goodsImage: require('../assets/blue.png'),
    imageTitle1: require('../assets/title_wave.png'),
    imageTitle2: require('../assets/title_blue.png'),
    color: '#527AD3',
    title: 'WAWE BLUE',
    name: 'DUALSHOCK 4',
    price: '$54',
  },
]

export default class App extends React.Component {
  scrollX = new Animated.Value(0);
  state = {
    isOpen: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />

        <ProductCarousel
          products={products}
          scrollEnabled={!this.state.isOpen}
          renderItem={({ item, index, scrollX }) => (
            <DualShock4
              pointerEvents={'auto'}
              key={`page-${index}`}
              scrollX={scrollX}
              index={index}
              item={item}
              onOpen={() => {
                this.setState({ isOpen: true });
              }}
              onClose={() => {
                this.setState({ isOpen: false });
              }}
            />
          )}
        />

        <TouchableOpacity style={styles.skipButton}>
          <Text style={{ color: '#fff' }}>
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
