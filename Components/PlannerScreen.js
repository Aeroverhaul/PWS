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
    }

    resetPlanner = async ()=>{
        await AsyncStorage.setItem('planner_time', '');
        await AsyncStorage.setItem('planner_name', '');
        await AsyncStorage.setItem('planner_id', '');
        this.refreshPlanner();
        alert('Planner has been reset!');
    }

    refreshPlanner = async ()=>{
        this.setState({
            isLoading: true
        });

        var url = await AsyncStorage.getItem("database_url");
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.content,
                isLoading: false
            });
            alert('Refreshed!');
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
        await AsyncStorage.setItem("database", this.state.dataSource);
    }

    componentDidMount() {
        init();
    }
    init = async ()=>{
        var url = await AsyncStorage.getItem("database_url");
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.content,
                isLoading: false
            });
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
        await AsyncStorage.setItem("database", this.state.dataSource);
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
        alert($temp);
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
        var planner = await AsyncStorage.getItem('planner_name');
        alert(planner);
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
                keyExtractor={item => item.name}
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