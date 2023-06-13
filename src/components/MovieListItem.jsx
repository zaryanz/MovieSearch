import React from 'react';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../api/constants';

export const MovieListItem = ({title, year, id}) => {
  const navigation = useNavigation();

  const navigateToDetailsScreen = () => {
    navigation.navigate(SCREENS.MovieDetails, {id, title});
  };

  return (
    <Pressable style={styles.container} onPress={navigateToDetailsScreen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.yearText}>{year}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: '#111111',
  },
  yearText: {
    fontSize: 14,
    color: '#505050',
  },
});
