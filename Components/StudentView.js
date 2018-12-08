import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Button, AsyncStorage } from 'react-native';

import ReadScreen from './ReadScreen';

export default class StudentView extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            isLoading: false,
            reading: false,
            item: null
        };
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
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
        return(
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginBottom: 5}} onPress={() => this.startReading({item})}>
                <Text>{item.name}</Text>
                <Text>{item.time}</Text>
            </TouchableOpacity>
        );
    }

    componentDidMount(){
        init();
    }
    init = async ()=>{
        var url = await AsyncStorage.getItem("database_url");
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.content,
            });
        })
        .catch((error) => {
            alert('Could not reach the server!')
        });
        await AsyncStorage.setItem("database", this.state.dataSource);
    }

  render() {
    return (
        this.state.reading ?
        <ReadScreen item={this.state.item} navigation={this.props.navigation} stopReading={this.stopReading}/>
        :
        this.state.isLoading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color='#330066' animating />
        </View>
        :
        <View style={styles.slide}>
            <Button onPress={() => this.refreshPlanner()} title='Refresh' />
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
      position: 'absolute',
      top: '3%',
      width: '100%',
      height: '100%',
      backgroundColor: '#F5F5F5'
    },
});