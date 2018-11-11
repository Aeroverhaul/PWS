import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Menu extends React.Component {

    onPress = () => {}

  render() {
    return (
        <View style={{position: 'absolute', bottom: 0, height: '12%', width: '100%'}}>
            <TouchableOpacity style={{position: 'absolute', bottom: '3%', left: '1%', width: '18.3%', height: '70%', backgroundColor: 'red'}} onPress={() => {this.props.callback(0)}}>

            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', bottom: '3%', left: '20.3%', width: '18.3%', height: '70%', backgroundColor: 'green'}} onPress={() => {this.props.callback(1)}}>

            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', bottom: '3%', left: '39.6%', width: '20.8%', height: '90%', backgroundColor: 'yellow'}} onPress={this.onPress}>

            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', bottom: '3%', left: '61.4%', width: '18.3%', height: '70%', backgroundColor: 'blue'}} onPress={() => {this.props.callback(2)}}>

            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', bottom: '3%', left: '80.7%', width: '18.3%', height: '70%', backgroundColor: 'purple'}} onPress={() => {this.props.callback(3)}}>

            </TouchableOpacity>
        </View>
    );
  }
}