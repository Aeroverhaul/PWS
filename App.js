import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PopularView from './Components/PopularView';
import StudentView from './Components/StudentView';
import UniqueView from './Components/UniqueView';

import PlannerScreen from './Components/PlannerScreen';
import TrackerScreen from './Components/TrackerScreen';

import StartScreen from './Components/StartScreen';

console.disableYellowBox = true;

export default class App extends React.Component {
constructor(props){
    super(props);
    this.state = {
        connected: false
    }
    this.init = this.init.bind(this);
    this.getJson = this.getJson.bind(this);
}

componentDidMount(){
    this.getJson().then(json => this.init({json}));
}
init = async ({json})=>{
    await AsyncStorage.setItem("database_url", 'https://www.h17nsnoek.helenparkhurst.net/PWS/test2.json');
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
        console.warn(responseData);
        return responseData;
    })
}

  render() {
    return (
        this.state.connected ?
        <View style={{flex: 1}}>
            <AppNavigator />
        </View>
        :
        <View style={{flex: 1}}>
            <StartScreen />
        </View>
    );
  }
}

const FilterTabNavigator = createMaterialTopTabNavigator({
    popular: {
        screen: PopularView,
        navigationOptions: {
            tabBarLabel: 'Popular'
        }
    },
    student: {
        screen: StudentView,
        navigationOptions: {
            tabBarLabel: 'Students'
        }
    },
    unique: {
        screen: UniqueView,
        navigationOptions: {
            tabBarLabel: 'Unique'
        }
    }
}, {
    initialRouteName: 'popular',
    order: ['popular','student','unique'],
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
})

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
