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
import GradientBackgrounds from './GradientBackgrounds';
import DualShock4 from './DualShock4';
import Indicator from './Indicator';
import ProductCarousel from './ProductCarousel';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: deviceWidth,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: "transparent",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  card: {
    backgroundColor: '#fff',
  },
  indicator: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 25,
  },
});

const products = [
  {
    image: require('../assets/red.png'),
    color: '#EB4A52',
    title: 'WAWE RED',
    name: 'DUALSHOCK 4',
    price: '$64',
  },
  {
    image: require('../assets/blue.png'),
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
