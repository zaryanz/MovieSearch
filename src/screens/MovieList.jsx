import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {apiInstance} from '../api/apiInstance';
import {MovieListItem} from '../components/MovieListItem';
import {SCREENS} from '../api/constants';

export const MovieList = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchText.trim() === '') {
      console.log('setting err');
      setErrorMessage('');
      setMovieList([]);
    } else {
      console.log(' this is search text', searchText);
      getMovieList(searchText);
    }
  }, [searchText]);

  const getMovieList = async searchText => {
    try {
      const res = await apiInstance.get(
        `?apikey=57ed164d&s=${searchText}&page=1&type=movie`,
      );
      if (res.data?.Response === 'True') {
        setErrorMessage('');
        setMovieList(res.data?.Search);
        setSearchHistory([
          ...searchHistory,
          {searchTitle: searchText, timestamp: new Date()},
        ]);
      } else {
        setErrorMessage('Please enter a more specific keyword');
      }
    } catch (error) {
      console.log(error, error?.response);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate(SCREENS.SearchHistory, {searchHistory})
        }>
        <Text style={styles.searchHistoryText}>{'View Search History ->'}</Text>
      </Pressable>
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
          onEndReachedThreshold={0.2}
          onEndReached={() => setPage(page + 1)}
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
  searchHistoryText: {
    fontSize: 16,
    color: '#111111',
    marginBottom: 12,
  },
});
