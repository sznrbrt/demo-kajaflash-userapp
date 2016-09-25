import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import Button from 'react-native-button';


const window = Dimensions.get('window');

export default class AppContainer extends Component {
  constructor(props) {
    super(props)

    this._iWantFood = this._iWantFood.bind(this);
  }

  _iWantFood() {
    console.log(this.state.lastPosition);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 75, backgroundColor: 'orange', width: window.width, alignItems: 'center', flexDirection: 'column'}}>
          <Text style={styles.topLogo}>KAJAFLASH</Text>
        </View>

        <View style={{ height: 150, backgroundColor: 'white', width: window.width, alignItems: 'center', flexDirection: 'column', paddingTop: 30}}>
          <Button
            onPress={this._iWantFood}
            containerStyle={{ padding:10, height:120 , borderRadius:4, borderColor: 'orange', borderWidth: 2, flexDirection:'column'}}
            style={{fontSize: 20, color: 'white' }}>
            <Image style={{ height: 100, width: 100}} source={require('../imgs/hamburger.png')} />
            <Text style={{backgroundColor: 'white', fontSize: 20, color: 'orange', fontFamily: 'Avenir-Heavy'}}>ÉTELT AKAROK!</Text>
          </Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topLogo: { color: 'white', fontSize: 26, fontFamily: 'Avenir-Heavy', textAlignVertical: 'center', marginTop: 30 },
});
