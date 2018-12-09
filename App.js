import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ListScreen from './Components/ListScreen';
import SearchScreen from './Components/SearchScreen';

import PlannerScreen from './Components/PlannerScreen';
import TrackerScreen from './Components/TrackerScreen';

import StartScreen from './Components/StartScreen';

console.disableYellowBox = true;

export default class App extends React.Component {
constructor(props){
    super(props);
    this.state = {
        connected: false,
    }
    this.init = this.init.bind(this);
    this.getJson = this.getJson.bind(this);
}

init = async ({json})=>{
   await AsyncStorage.setItem('database', JSON.stringify(json));
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
        return responseData;
    })
}

connect = async ({url})=>{
    await AsyncStorage.setItem("database_url", url);
    this.setState({
        connected: true
    })
    this.getJson().then(json => this.init({json}));
}

  render() {
    return (
        this.state.connected ?
        <View style={{flex: 1}}>
            <AppNavigator />
        </View>
        :
        <View style={{flex: 1}}>
            <StartScreen connected={(url) => this.connect({url})}/>
        </View>
    );
  }
}

const FilterTabNavigator = createMaterialTopTabNavigator({
    screen1: {
        screen: ({navigation}) => <ListScreen order_number={1} screenProps={{ rootNavigation: navigation }}/>,
        navigationOptions: {
            tabBarLabel: 'default1',
        }
    },
    screen2: {
        screen: ({navigation}) => <ListScreen order_number={2} screenProps={{ rootNavigation: navigation }}/>,
        navigationOptions: {
            tabBarLabel: 'default2',
        }
    },
    screen3: {
        screen: ({navigation}) => <ListScreen order_number={3} screenProps={{ rootNavigation: navigation }}/>,
        navigationOptions: {
            tabBarLabel: 'default3',
        }
    },
    search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarLabel: 'Search',
        }
    }
}, {
    initialRouteName: 'screen1',
    order: ['screen1','screen2','screen3','search'],
    tabBarOptions:{
        activeTintColor:'black',
        inactiveTintColor:'gray',
        style: {
            backgroundColor: 'white',
            top: '3%'
        },
        indicatorStyle:{
            backgroundColor: 'lightblue'
        }
    }
});

const AppNavigator = createBottomTabNavigator({
    activity: { screen: FilterTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Activity',
            tabBarIcon: ({tintColor}) => (<Icon name="ios-home" color={tintColor} size={24} />)
        }
    },
    planner: { screen:PlannerScreen,
        navigationOptions: {
            tabBarLabel: 'Planner',
            tabBarIcon: ({tintColor}) => (<Icon name="ios-calendar" color={tintColor} size={24} />)
        }
    },
    tracker:  { screen:TrackerScreen,
         navigationOptions: {
            tabBarLabel: 'Tracker',
            tabBarIcon: ({tintColor}) => (<Icon name="ios-map" color={tintColor} size={24} />)
         }
    }
}, {
    tabBarOptions: {
        style: {
            borderTopWidth: 0
        }
    }
});