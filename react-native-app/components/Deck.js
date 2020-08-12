import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }
  
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      page: 1,
      error: null,
    };
  }
  fetchCards = () => {
      const {page} = this.state;
      axios
        .get(`https://yugioh-user-service.herokuapp.com/api/cards`)
        .then(response => {
            this.setState({
                cards: response.data,
            })
        })
        .catch(error => {
            this.setState({error: error});
        });
  };
  componentDidMount() {
    this.fetchCards(this.state.page);
  }

  render() {
    return (
        <View style={styles.container}>

            <Text style={styles.instructions}>
                To add cards using a photo, just press the button below!
            </Text>

            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
    
            <FlatList
            contentContainerStyle={{
                backgroundColor: '#FBFBF8',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
            }}
            data={this.state.cards}
            keyExtractor={user => user.id}
            renderItem={({item}) => (
                <View
                style={{
                    marginTop: 10,
                }}>
                <Card>
                    <Text>{item.name}</Text>
                </Card>
                </View>
            )}
            />
        </View>
    );
  }
}
export default Deck;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 20,
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
      },
    buttonText: {
    fontSize: 20,
    color: '#fff',
    }, 
  });