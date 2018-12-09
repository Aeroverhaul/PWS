import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Button, AsyncStorage } from 'react-native';

import ReadScreen from './ReadScreen';

export default class ListScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            l_list: [],
            isLoading: false,
            reading: false,
            item: null,
        };
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
        this.startUp = this.startUp.bind(this);
        this.update = this.update.bind(this);
        this.getJson = this.getJson.bind(this);
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
        this.startUp();
    }
    startUp = async ()=>{
        var full_db = await AsyncStorage.getItem('database');
        var db_list = JSON.parse(full_db).lists;
        var db_unit = JSON.parse(full_db).content;
        var temp = [];
        if(db_list.length >= this.props.order_number){
            var list_name = db_list[this.props.order_number-1].l_name;
            db_unit.map(item =>{
                if(item.l_name==list_name){
                    temp.push(item);
                }
            })
        }
        this.setState({
            dataSource: temp
        })
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
                keyExtractor={item => item.id}
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