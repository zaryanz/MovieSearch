// @ts-check
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from './components/SearchBar';
import {MovieList} from './screens/MovieList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MovieDetails} from './screens/MovieDetails';
import {NavigationContainer} from '@react-navigation/native';
import {SearchHistory} from './components/SearchHistory';
import {SCREENS} from './api/constants';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.MovieList}
          component={MovieList}
          options={{title: 'Search Movies'}}
        />
        <Stack.Screen
          name={SCREENS.MovieDetails}
          component={MovieDetails}
          options={({route}) => ({title: route.params.title})}
        />
        <Stack.Screen
          name={SCREENS.SearchHistory}
          component={SearchHistory}
          options={{title: 'Search History'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
