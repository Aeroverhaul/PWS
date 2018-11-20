import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import ReadScreen from './ReadScreen';

export default class PlannerScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource1: [],
            dataSource2: [],
            isLoading: true,
            item: null,
            reading: false
        }
        this.resetPlanner = this.resetPlanner.bind(this);
        this.showPlanner = this.showPlanner.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    resetPlanner = async ()=>{
        await AsyncStorage.setItem('planner_time', '');
        await AsyncStorage.setItem('planner_name', '');
        this.refreshPlanner();
        alert('Planner has been reset!');
    }

    showPlanner = async ()=>{
        var planner = await AsyncStorage.getItem('planner_name');
        alert(planner);
    }

    refreshPlanner(){
        this.setState({
            isLoading: true
        });
        fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource1: responseJson.event_array,
            });
            this.forceUpdate();
            fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource1: responseJson.event_array,
                });
                fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test2.json')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource2: responseJson.event_array,
                    });
                    this.forceUpdate();
                    fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test2.json')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            dataSource2: responseJson.event_array,
                            isLoading: false
                        });
                        alert('Refreshed!');
                    })
                    .catch((error) => {
                        alert('Could not reach the server!')
                    });
                })
                .catch((error) => {
                    alert('Could not reach the server!')
                });
            })
            .catch((error) => {
                alert('Could not reach the server!')
            });
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
    }

    componentDidMount() {
        fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource1: responseJson.event_array,
                isLoading: false
            });
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
        fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test2.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource2: responseJson.event_array,
                isLoading: false
            });
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
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

        AsyncStorage.getItem('planner_name').then(name => {
          this.setState({
            name_string: name
          });
        })

        if(this.state.name_string != null){
            var name_array = this.state.name_string.split(',');

            name_array.map(name => {
                if(name == item.name){
                    approved = true;
                }
            })
        }

        if(approved){
            return (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginBottom: 5}} onPress={() => this.startReading({item})}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            );
        } else {
            return null
        }
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
            <Button onPress={() => this.showPlanner()} title='Show Planner' />
            <Button onPress={() => this.resetPlanner()} title='Reset Planner' />
            <FlatList
                data={this.state.dataSource1}
                renderItem={this.renderItem}
                keyExtractor={item => item.name}
            />
            <FlatList
                data={this.state.dataSource2}
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