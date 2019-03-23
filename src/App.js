import React from 'react';
import {
  Image,
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import GradientBackgrounds from './GradientBackgrounds';
import DualShock4 from './DualShock4';
import Indicator from './Indicator';

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
  }
});

const pages = [
  {
    image: require('../assets/red.png'),
    backgroundColor: '#EB4A52',
    title: 'WAWE RED',
    name: 'DUALSHOCK 4',
    price: '$64',
  },
  {
    image: require('../assets/blue.png'),
    backgroundColor: '#527AD3',
    title: 'WAWE BLUE',
    name: 'DUALSHOCK 4',
    price: '$54',
  },
  // {
  //   image: require('../assets/blue.png'),
  //   backgroundColor: '#527AD3',
  //   title: 'WAWE BLUE',
  //   name: 'DUALSHOCK 4',
  //   price: '$54',
  // },
  // {
  //   image: require('../assets/blue.png'),
  //   backgroundColor: '#527AD3',
  //   title: 'WAWE BLUE',
  //   name: 'DUALSHOCK 4',
  //   price: '$54',
  // },
  // {
  //   image: require('../assets/blue.png'),
  //   backgroundColor: '#527AD3',
  //   title: 'WAWE BLUE',
  //   name: 'DUALSHOCK 4',
  //   price: '$54',
  // },
]

export default class App extends React.Component {
  scrollRef = React.createRef();
  scrollX = new Animated.Value(0);
  state = {
    height: 0,
    isOpen: false,
  }

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  };

  scrollTo = (index) => {
    this.scrollRef.current._component.scrollTo({
      y: ROW_HEIGHT * index,
      animated: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <GradientBackgrounds
          scrollX={this.scrollX}
          colors={pages.map(i => i.backgroundColor)}
        />

        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />

        <Animated.ScrollView
          ref={this.scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          scrollEventThrottle={1}
          onLayout={this.onLayout}
          scrollEnabled={!this.state.isOpen}
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
          {pages.map((item, index) => (
            <DualShock4
              pointerEvents={'auto'}
              key={`page-${index}`}
              scrollX={this.scrollX}
              index={index}
              item={item}
              onOpen={() => {
                this.setState({ isOpen: true });
              }}
              onClose={() => {
                this.setState({ isOpen: false });
              }}
            />
          ))}
        </Animated.ScrollView>

        {
          !this.state.isOpen ? (
            <View style={styles.indicator}>
              <Indicator
                scrollX={this.scrollX}
                count={pages.length}
              />
            </View>
          ) : null
        }
      </View>
    );
  }
}
