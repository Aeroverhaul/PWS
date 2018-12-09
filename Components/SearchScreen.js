import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Button, AsyncStorage } from 'react-native';

import ReadScreen from './ReadScreen';

export default class SearchScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            l_list: [],
            isLoading: false,
            reading: false,
            searching: false,
            item: null,
        };
        this.startReading = this.startReading.bind(this);
        this.stopReading = this.stopReading.bind(this);
        this.refreshPlanner = this.refreshPlanner.bind(this);
        this.filter = this.filter.bind(this);
        this.update = this.update.bind(this);
        this.getJson = this.getJson.bind(this);
    }

    refreshPlanner(){
        this.getJson().then(json => this.update({json}));
    }
    update = async ({json})=>{
        await AsyncStorage.setItem('database', JSON.stringify(json));
        this.filter();
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
        this.filter();
    }
    filter = async ()=>{// this.setState({new DataSource based on filter})
        var full_db = await AsyncStorage.getItem('database');
        await AsyncStorage.setItem('filter', 'null,null,C209,null,null');//(l_name, name, class, time, context)
        var filter_raw = await AsyncStorage.getItem('filter');
        var filter = filter_raw.split(",");
        var db_unit = JSON.parse(full_db).content;
        var temp = db_unit;
        if(filter[0]!='null'){//l_name filter:
            for(var i = temp.length-1; i >= 0; i--){
                if(temp[i].l_name!=filter[0]){
                    temp.splice(i,1);
                }
            }
        }
        if(filter[2]!='null'){//class filter
            for(var i = temp.length-1; i >= 0; i--){
                if(temp[i].class!=filter[2]){
                    temp.splice(i,1);
                }
            }
        }
        if(filter[3]!='null'){// time filter
            for(var i = temp.length-1; i >= 0; i--){
                if(temp[i].class!=filter[3]){
                    temp.splice(i,1);
                }
            }
        }
        this.setState({
            dataSource: temp
        })
    }
    setFilter = async ({filterNumber, value})=>{
        var filter = await AsyncStorage.getItem('filter');
        var filter_array = filter.split(',');
        filter_array[filterNumber] = value;
        var temp = "";
        filter_array.map(item =>{
            temp = `${temp}${item},`;
        })
        await AsyncStorage.setItem('filter', temp);
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
        !this.state.searching ?
        <View style={styles.slide}>
            <Button onPress={() => this.refreshPlanner()} title='Refresh' />
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
            <Button title='Search' onPress={()=>this.setState({searching: true})}/>
        </View>
        :
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title='Go back' onPress={()=>this.setState({searching: false})} />
            <Button title='Search' onPress={()=>this.filter()} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      position: 'absolute',
      top: '3%',
      width: '100%',
      height: '97%',
      backgroundColor: '#F5F5F5'
    },
});