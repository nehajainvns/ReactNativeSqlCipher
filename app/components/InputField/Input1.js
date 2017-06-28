import React, { Component } from 'react';
import {AppRegistry,Text,View,TextInput} from 'react-native';

export default class Input1 extends Component {
    constructor(props){
        super(props);
        this.state = {text1: 'Dummy Placeholder', text2 : 'Vrishank'};
    }

  render() {
    console.log("Hello World");
    return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text1) => this.setState({text1})}
        value={this.state.text1}
      />
      <Text>{this.state.text1}</Text>

      <TextInput
        onChangeText={(text2) => this.setState({text2})}
        value={this.state.text2}
      />
      <Text>{this.state.text2}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Input1', () => Input1);