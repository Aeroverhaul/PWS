import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Activity from './Components/Activity';
import Read from './Components/Read';
import Planner from './Components/Planner';
import Tracker from './Components/Tracker';
import Menu from './Components/Menu';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {screen: 0};
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(value){
        this.setState({screen:value})
    }

  render() {
    if(this.state.screen == 0){
        return(
            <View style={{flex: 1}}>
                <Activity />
                <Menu callback={this.onButtonClick}/>
            </View>
        );
    } else if(this.state.screen == 1){
        return(
            <View style={{flex: 1}}>
                <Read />
                <Menu callback={this.onButtonClick}/>
            </View>
        );
    } else if(this.state.screen == 2){
             return(
                 <View style={{flex: 1}}>
                     <Planner />
                     <Menu callback={this.onButtonClick}/>
                 </View>
             );
         } else if(this.state.screen == 3){
        return(
            <View style={{flex: 1}}>
                <Tracker />
                <Menu callback={this.onButtonClick}/>
            </View>
        );
    }
  }
}