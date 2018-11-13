import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ReadScreen extends React.Component {
  render() {
    return (
        <View style={styles.slide}>
            <Button onPress={() => this.props.stopReading()} title='Go Back' />
            <Text>{this.props.iname}</Text>
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