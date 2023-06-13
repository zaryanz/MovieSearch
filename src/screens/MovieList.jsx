// @ts-check
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {apiInstance} from '../api/apiInstance';
import {MovieListItem} from '../components/MovieListItem';

export const MovieList = () => {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchText) {
      getMovieList(searchText);
    }
  }, [searchText]);

  const getMovieList = async searchText => {
    try {
      const res = await apiInstance.get(
        `?apikey=57ed164d&s=${searchText}&page=1&type=movie`,
      );
      console.log(res.data);
      if (res.data?.Response === 'True') {
        setErrorMessage('');
        setMovieList(res.data?.Search);
      } else {
        setErrorMessage('Please enter more specific keyword');
      }
    } catch (error) {
      console.log(error, error?.response);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={movieList}
          renderItem={({item, index}) => (
            <MovieListItem
              title={item?.Title}
              year={item?.Year}
              key={item?.imdbID}
              id={item?.imdbID}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
