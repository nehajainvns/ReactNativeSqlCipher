import React, { Component } from 'react';
import {AppRegistry,Text,View,TextInput} from 'react-native';

export default class Input1 extends Component {
    constructor(props){
        super(props);
        this.state = {...this.props};
    }

    static defaultProps={
        text1:"Dummy Placeholder",
        label:"No label"
    }

  render() {
    return (
    <View style={{flexDirection: 'row'}}>
    <Text>{this.state.label}{'\t'}</Text>
    <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 2}}
        onChangeText={(text1) => this.setState({text1})}
        value={this.state.text1}
      />
      </View>
    );
  }
}

AppRegistry.registerComponent('Input1', () => Input1);