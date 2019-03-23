import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#3A9C4A',
    fontSize: 18,
  },
  button: {
    paddingLeft: 80,
    paddingRight: 80,
    height: 50,
    borderWidth: 2,
    borderColor: '#3A9C4A',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}