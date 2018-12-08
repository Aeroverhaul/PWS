import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PopularView from './Components/PopularView';
import StudentView from './Components/StudentView';
import UniqueView from './Components/UniqueView';

import PlannerScreen from './Components/PlannerScreen';
import TrackerScreen from './Components/TrackerScreen';

console.disableYellowBox = true;

export default class App extends React.Component {
constructor(props){
    super(props);
    this.state = {
        database: []
    }
}
  render() {
    await AsyncStorage.setItem("database_url", 'https://www.h17nsnoek.helenparkhurst.net/PWS/test2.json');
    var  url = await AsyncStorage.getItem("database_url");
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            database: responseJson.content
        });
    })
    .catch((error) => {
        alert('Could not reach the server!');
    })
    await AsyncStorage.setItem('database', this.state.database);

    return (
        <View style={{flex: 1}}>
            <AppNavigator />
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
