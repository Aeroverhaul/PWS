import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import ReadScreen from './ReadScreen';

export default class PlannerScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            isLoading: false,
            item: null,
            reading: false
        }
        this.resetPlanner = this.resetPlanner.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.startUp = this.startUp.bind(this);
        this.update = this.update.bind(this);
        this.getJson = this.getJson.bind(this);
    }

    resetPlanner = async ()=>{
        await AsyncStorage.setItem('planner_time', '');
        await AsyncStorage.setItem('planner_name', '');
        await AsyncStorage.setItem('planner_id', '');
        //make a function to update the render
        alert('Planner has been reset!');
    }

    refreshPlanner(){
        this.getJson().then(json => this.update({json}));
    }
    update = async ({json})=>{
        await AsyncStorage.setItem('database', JSON.stringify(json));
        this.setState({
            dataSource: json.content
        });
    }
    getJson = async ()=>{
        var url = await AsyncStorage.getItem("database_url");
        return fetch(url,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.warn(responseData);
            return responseData;
        })
    }

    componentDidMount(){
        this.startUp();
    }
    startUp = async ()=>{
        var temp = await AsyncStorage.getItem('database');
        var db = JSON.parse(temp).content;
        this.setState({
            dataSource: db
        })
    }

    startReading = ({item}) => {
        this.setState({
            reading: true,
            item: item
        });
    }

    stopReading(){
        this.setState({
            reading: false
        })
    }

    renderItem = ({item}) => {
        var approved = false;

        AsyncStorage.getItem('planner_id').then(id => {
          this.setState({
            id_string: id
          });
        })

        if(this.state.id_string != null){
            var id_array = this.state.id_string.split(',');

            id_array.map(id => {
                if(id == item.id){
                    approved = true;
                }
            })
        }

        if(approved){
            return (
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                    <TouchableOpacity onPress={() => this.startReading({item})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.removeItem({item})}>
                        <Text>Remove</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null
        }
    }

    removeItem = async ({item})=>{
        index = 0;
        found = false;
        $temp = await AsyncStorage.getItem('planner_id');
        var $ids_array = $temp.split(',');
        $ids_array.map(id => {
            if(id==item.id){
                found = true;
            }
            if(!found){
                index++;
            }
        })
        $temp = $temp.replace(`${$temp.split(",")[index]},`, "");
        await AsyncStorage.setItem('planner_id', $temp);

        $temp = await AsyncStorage.getItem('planner_time');
        $temp = $temp.replace(`${$temp.split(",")[index]},`, "");
        await AsyncStorage.setItem('planner_time', $temp);

        $temp = await AsyncStorage.getItem('planner_name');
        $temp = $temp.replace(`${$temp.split(",")[index]},`, "");
        await AsyncStorage.setItem('planner_name', $temp);

        this.refreshPlanner();
    }

  render() {
    return (
        this.state.reading ?
        <ReadScreen item={this.state.item} stopReading={this.stopReading}/>
        :
        this.state.isLoading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color='#330066' animating />
        </View>
        :
        <View style={styles.slide}>
            <Button onPress={() => this.refreshPlanner()} title='Refresh' />
            <Button onPress={() => this.resetPlanner()} title='Reset Planner' />
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
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