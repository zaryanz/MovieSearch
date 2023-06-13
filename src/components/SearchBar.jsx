// @ts-check
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

export const SearchBar = ({searchText, setSearchText}) => {
  return (
    <TextInput
      value={searchText}
      style={styles.searchBar}
      onChangeText={value => setSearchText(value)}
      placeholder="Start searching a movie..."
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    padding: 8,
    borderRadius: 12,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    fontSize: 16,
    color: '#111111',
    backgroundColor: '#ffffff',
  },
});
