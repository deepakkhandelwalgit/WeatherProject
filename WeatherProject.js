import React, { Component } from 'react';
//var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} = require('react-native');

var Forecast = require('./Forecast');

var WeatherProject = React.createClass({
//class WeatherProject extends Component {
  // If you want to have a default zip code, you could add one here
  getInitialState() {
    return ({
      city: '',
      forecast: null
    });
  },
  // We'll pass this callback to the <TextInput>
  _handleTextChange(event) {
    var city = event.nativeEvent.text;
    const appID = '9445d3d1a828df5d9a56b51715e932ea';
    //console.log(zip);
    this.setState({city});
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid='+ appID).then((response) => response.json()).then((responseJSON) => {
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description: responseJSON.weather[0].description,
          temp: (responseJSON.main.temp - 273.15).toFixed(2)
        }
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  },
  render() {
    var content = null;
    console.log(this.state.forecast);
    if (this.state.forecast !== null) {
      content = <Forecast
      main={this.state.forecast.main}
      description={this.state.forecast.description}
      temp={this.state.forecast.temp}/>;
    }
    return (
      <View style={styles.container}>
        <Image source={require('./weather.png')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
              Current weather for city
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                style={[styles.zipCode, styles.mainTextInput]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}/>
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
});

var baseFontSize = 24;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 100,
    height: 50,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  },
  mainTextInput: {
    flex: 2,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = WeatherProject;
