import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Button } from 'react-native';

import ReadScreen from './ReadScreen';

export default class PopularView extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            isLoading: true,
            reading: false,
            item: null
        };
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
    }

    refreshPlanner(){
        this.setState({
            isLoading: true
        });

        fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.event_array,
            });
            fetch('http://www.h17nsnoek.helenparkhurst.net/PWS/test.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.event_array,
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
        var url = 'http://www.h17nsnoek.helenparkhurst.net/PWS/test.json'

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.event_array,
                isLoading: false
            })
        })
        .catch((error) => {
            alert('Could not reach the server!')
        })
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