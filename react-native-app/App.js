import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Monsters from './components/Monsters.js';
import Deck from './components/Deck.js'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Monster Cards"
        onPress={() => navigation.navigate('Monster Cards')}
      />
      <Button
        title="Go to My Deck"
        onPress={() => navigation.navigate('My Deck')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Yu-Gi-Oh! Deck">
        <Stack.Screen name="Yu-Gi-Oh! Deck" component={HomeScreen} />
        <Stack.Screen name="Monster Cards" component={Monsters} />
        <Stack.Screen name="My Deck" component={Deck} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
