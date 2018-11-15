import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class ReadScreen extends React.Component {
    constructor(props){
        super(props);
        this.addToPlanner = this.addToPlanner.bind(this);
    }

    addToPlanner = async ()=>{
        var new_name = this.props.item.name.toString();
        var new_time = this.props.item.time.toString();

        var name_string = await AsyncStorage.getItem('planner_name');
        var time_string = await AsyncStorage.getItem('planner_time');

        if(name_string != null){
            var add = true;
            var name_array = name_string.split(',');
            name_array.map(name => {
                if(name==new_name){
                    add = false;
                }
            })
            if(add){
                await AsyncStorage.setItem('planner_name', `${name_string}${new_name},`);
                await AsyncStorage.setItem('planner_time', `${time_string}${new_time},`);
                alert(`${new_name} has been added to your planner!`);
            }
        } else {
            await AsyncStorage.setItem('planner_name', `${new_name},`);
            await AsyncStorage.setItem('planner_time', `${new_time},`);
            alert(`${new_name} has been added to your planner!`);
        }
    }



  render() {
    return (
        <View style={styles.slide}>
            <Button onPress={() => this.props.stopReading()} title='Go Back' />
            <Button onPress={() => this.addToPlanner()} title='Add to favorite' />
            <Text>{this.props.item.name}</Text>
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