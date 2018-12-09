import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button    } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class StartScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
        status: 0,
        considering: false,
      }
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {// make a function to test if the database is viable
    if(!this.state.considering){
        this.state.considering = true;
        Alert.alert(
            'Access this event',
            'event name here!',
            [
            {
                text: 'Participate',
                onPress: () => this.open(result.data),
            },
            { text: 'Leave', onPress: () => {this.state.considering = false} },
            ],
            { cancellable: false }
        );
    }
  };
  open = (url) =>{
    this.state.considering = false;
    this.props.connected(url);
  }

    render() {
        if(this.state.status == 0){
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <Button title='Got the link' onPress={()=>this.setState({status: 1})} />
                    <Button title='Scan QR code' onPress={()=>this.setState({status: 3})} />
                    <Button title='already accessed the link' onPress={()=>this.setState({status: 2})} />
                    <Button title='Skip this' onPress={()=>this.open('https://www.h17nsnoek.helenparkhurst.net/PWS/test2.json')} />
                </View>
            );
        } else if(this.state.status == 1){
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <Text>Still have to make this</Text>
                    <Button title='Go back' onPress={()=>this.setState({status: 0})} />
                </View>
            );
        } else if(this.state.status == 2){
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <Text>Still have to make this</Text>
                    <Button title='Go back' onPress={()=>this.setState({status: 0})} />
                </View>
            );
        } else if(this.state.status == 3){
            return (
                <View style={{flex: 1}}>

                    {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text>
                    :
                    this.state.hasCameraPermission === false ? 
                        <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
                        : 
                        <View style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}}>
                            <BarCodeScanner
                                onBarCodeRead={this._handleBarCodeRead}
                                style={{
                                height: (Dimensions.get('window').height),
                                width: Dimensions.get('window').width,
                                position: 'absolute',
                                top: 0
                                }}
                            />
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: (Dimensions.get('window').height*0.9),
                                left: 0,
                                width: Dimensions.get('window').width,
                                height: (Dimensions.get('window').height*0.1),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} onPress={()=>this.setState({status: 0})}>
                                <Text style={{fontSize: 30, color: 'white'}}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <StatusBar hidden />
                </View>
            );
        }
    }
}