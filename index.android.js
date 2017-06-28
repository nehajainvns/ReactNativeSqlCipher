import React, { Component } from 'react';
import SQLite from 'react-native-sqlcipher-storage';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

//let SQLite = require('react-native-sqlite-storage');
//let SQLite = require('react-native-sqlcipher-storage');
var db;
var database_key = "password";
var bad_database_key = "bad";
var goodPassword = true;
SQLite.enablePromise(true);

export default class myApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
            name: 'Name',
              bp: 'BP',
      weight: 'Weight',
      temperature: 'Temp',
      error: 'Error',
      info: 'Info'
    };  
    SQLite.openDatabase({'name': 'myApp.db', 'key': goodPassword ? database_key : bad_database_key}).then((DB) => {
            db = DB;   
             
       if (db) {
      try {
        db.transaction((tx) => {
          try {
            //tx.executeSql('DROP TABLE IF EXISTS Patient');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Patient('
              + 'patient_id INTEGER,'
              + 'name VARCHAR(50),'
              + 'bp VARCHAR(50),'
              + 'weight VARCHAR(50),'
              + 'temperature VARCHAR(50))', [], () => this.setState({ info: "Creation Success" }), () => this.setState({ error: "Creation Error" }));
          } catch (error) {
            this.setState({ error: "Error in table creation :( " });
          }
        });
      } catch (error) {
        this.setState({ error: "ERROR in Table creation" });
      }
    }
    else {
      this.setState({ error: "DB not Ready Yet :(" });
    } }).catch((error) => {
            console.log(error);
        });  
 
  }

  componentWillUnmount() {
    db.close(() => this.setState({ info: "DB Closed" }), () => this.setState({ error: "Error Closing DB" }));
  }

  errorCB(err) {
  }

  successCB() {
  }

  openCB() {
  }

  SQLiteInsert() {
    if (db) {
      try {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Patient(name,bp,weight,temperature) VALUES (\"'
            + this.state.name + '\",\"' + this.state.bp + '\",\"' + this.state.weight + '\",\"' + this.state.temperature + '\");', [], () => this.setState({ info: "Insertion Success" }), () => this.setState({ error: "Insertion Error" }));
        });
      } catch (error) {
        this.setState({ error: "Insertion Error" });
      }
    }
    else {
      this.setState({ error: "DB not Ready :(" });
    }
  }

  SQLiteRetrieve() {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Patient where name=\"' + this.state.name + '\";', [], (tx, results) => {
          let row = results.rows.item(results.rows.length - 1);
          this.setState({ name: row.name, bp: row.bp, weight: row.weight, temperature: row.temperature });
        });
      });
    } catch (error) {
      this.setState({ error: "SQLite Retrieve Error" });
    }
  }

  AsyncInsert() {
    try {
      AsyncStorage.setItem('patientData', JSON.stringify({
        name: this.state.name,
        bp: this.state.bp,
        weight: this.state.weight,
        temperature: this.state.temperature
      }));
    } catch (error) {
      this.setState(error);
    }
  }

  AsyncRetrieve() {
    try {
      AsyncStorage.getItem('patientData').then((value) => {
        if (value) {
          this.setState(JSON.parse(value));
        }
        else {
          this.setState({info: 'Async value Not received' });
        }
      }).done();
    } catch (error) {
      this.setState({error:"Async Retrieve Error"});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Patient Details
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text>Name: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Enter Name'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>BP: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(bp) => this.setState({ bp })}
            value={this.state.bp}
            placeholder='Enter Blood Pressure'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Weight: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(weight) => this.setState({ weight })}
            value={this.state.weight}
            placeholder='Enter Weight'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Temperature: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            onChangeText={(temperature) => this.setState({ temperature })}
            value={this.state.temperature}
            placeholder='Enter Temperature'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>SQLITE: </Text>
          <Button
            onPress={() => this.SQLiteInsert()}
            title="Insert"
            color="blue"
            accessibilityLabel="Save data to database">
            Insert
        </Button>
          <Button
            onPress={() => this.SQLiteRetrieve()}
            title="Retrieve"
            color="green"
            accessibilityLabel="Retrieve data from database">
            Retrieve
        </Button>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>AsyncDB: </Text>
          <Button
            onPress={() => this.AsyncInsert()}
            title="Insert"
            color="blue"
            accessibilityLabel="Save data to database">
            Insert
        </Button>
          <Button
            onPress={() => this.AsyncRetrieve()}
            title="Retrieve"
            color="green"
            accessibilityLabel="Retrieve data from database">
            Retrieve
        </Button>
        </View>
        <View>
          <Text>Info: {this.state.info}</Text>
        </View>
        <View>
          <Text>Error: {this.state.error}</Text>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

var listStyles = StyleSheet.create({
  li: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 15,
  },
  liIndent: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  },
});


AppRegistry.registerComponent('myApp', () => myApp);
