import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class ReadScreen extends React.Component {
    constructor(props){
        super(props);
        this.addToPlanner = this.addToPlanner.bind(this);
        this.goToTracker = this.goToTracker.bind(this);
    }

    goToTracker = async ()=>{
        await AsyncStorage.setItem('localize', this.props.item.class);
        this.props.navigation.navigate('tracker');
    }

    addToPlanner = async ()=>{
        var new_name = this.props.item.name.toString();
        var new_time = this.props.item.time.toString();
        var new_id = this.props.item.id.toString();

        var name_string = await AsyncStorage.getItem('planner_name');
        var time_string = await AsyncStorage.getItem('planner_time');
        var id_string = await AsyncStorage.getItem('planner_id');

        if(id_string != null){
            var add = true;
            var id_array = id_string.split(',');
            id_array.map(id => {
                if(id==new_id){
                    add = false;
                }
            })
            if(add){
                await AsyncStorage.setItem('planner_name', `${name_string}${new_name},`);
                await AsyncStorage.setItem('planner_time', `${time_string}${new_time},`);
                await AsyncStorage.setItem('planner_id', `${id_string}${new_id}`);
                alert(`${new_name} has been added to your planner!`);
            } else {
                alert('This is already in your planner!');
            }
        } else {
            await AsyncStorage.setItem('planner_name', `${new_name},`);
            await AsyncStorage.setItem('planner_time', `${new_time},`);
            await AsyncStorage.setItem('planner_id', `${new_id},`);
            alert(`${new_name} has been added to your planner!`);
        }
    }



  render() {
    return (
        <View style={styles.slide}>
            <Button onPress={() => this.props.stopReading()} title='Go Back' />
            <Button onPress={() => this.goToTracker()} title='Locate the event' />
            <Button onPress={() => this.addToPlanner()} title='Add to your planner' />
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