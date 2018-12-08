import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';

export default class TrackerScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            class: null
        }
        this.mountClass = this.mountClass.bind(this);
    }

    mountClass = async ()=>{
        $temp = await AsyncStorage.getItem('localize');
        this.setState({
            class: $temp
        });
    }

  render() {
    this.mountClass();
    return (
        <View style={styles.slide}>
             <Text>{this.state.class}</Text>
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