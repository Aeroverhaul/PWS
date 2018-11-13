import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PopularView from './Components/PopularView';
import SoonView from './Components/SoonView';
import UniqueView from './Components/UniqueView';

import FavoriteScreen from './Components/FavoriteScreen';
import PlannerScreen from './Components/PlannerScreen';
import TrackerScreen from './Components/TrackerScreen';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
        <View style={{flex: 1}}>
            <AppNavigator dataCallback={this.setData} readCallback={this.changeReading} />
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
    soon: {
        screen: SoonView,
        navigationOptions: {
            tabBarLabel: 'Soon'
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
    order: ['popular','soon','unique'],
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
    favorite: { screen:FavoriteScreen,
        navigationOptions: {
            tabBarLabel: 'Favorite',
            tabBarIcon: ({tintColor}) => (<Icon name="ios-star" color={tintColor} size={24} />)
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