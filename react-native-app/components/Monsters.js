import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';
class Monsters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      monsterCards: [],
      page: 1,
      error: null,
      isLoading: true,
    };
  }
  fetchMonsterCards = () => {
      const {page} = this.state;
      axios
        .get(`https://yugioh-data-service.herokuapp.com/monsters?page=${page}&limit=10`)
        .then(response => {
            this.setState({
                monsterCards: this.state.monsterCards.concat(response.data.data),
            })
        })
        .catch(error => {
            this.setState({error: error});
        })
        .finally(() => this.setState({isLoading: false}));
  };
  componentDidMount() {
    this.fetchMonsterCards(this.state.page);
  }

  fetchMoreMonsterCards = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchMonsterCards();
      },
    );
  };
  render() {
    return (
        <View>
            {this.state.isLoading ? <ActivityIndicator/> : (
                <FlatList
                contentContainerStyle={{
                    backgroundColor: '#FBFBF8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                }}
                onEndReached={this.fetchMoreMonsterCards}
                onEndReachedThreshold={0.5}
                data={this.state.monsterCards}
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
                )}/>
        )}
        </View>
    );
  }
}
export default Monsters;