import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class UniqueView extends React.Component {
  render() {
    return (
        <View style={styles.slide}>
            <Text>Unique</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
    },
});