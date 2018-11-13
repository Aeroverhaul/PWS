import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';

import ReadScreen from './ReadScreen';

export default class PopularView extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            isLoading: true,
            reading: false,
            iName: 'default'
        };
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    startReading = ({item}) => {
        this.setState({
            reading: true,
            iName: item.name
        });
    }

    stopReading(){
        this.setState({
            reading: false
        })
    }

    renderItem = ({item}) => {
        this.setName
        return(
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginBottom: 5}} onPress={() => this.startReading({item})}>
                <Text>{item.name}</Text>
                <Text>{item.desc}</Text>
            </TouchableOpacity>
        );
    }

    componentDidMount(){
        const url = 'http://www.h17nsnoek.helenparkhurst.net/PWS/test.json'

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.event_array,
                isLoading: false
            })
        })
        .catch((error) => {
            Alert.alert('Could not reach the server!')
        })
    }

  render() {
    return (
        this.state.reading ?
        <ReadScreen iname={this.state.iName} stopReading={this.stopReading}/>
        :
        this.state.isLoading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color='#330066' animating />
        </View>
        :
        <View style={styles.slide}>
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
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