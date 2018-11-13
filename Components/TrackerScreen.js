import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TrackerScreen extends React.Component {
  render() {
    return (
        <View style={styles.slide}>
             <Text>Tracker</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});