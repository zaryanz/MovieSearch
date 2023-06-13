// @ts-check
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {apiInstance} from '../api/apiInstance';

export const MovieDetails = ({route}) => {
  const id = route?.params?.id;
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});

  const getMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await apiInstance.get(`?apikey=57ed164d&i=${id}&plot=short`);
      console.log(res.data);
      setMovieDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error, error?.response);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" style={{marginTop: 300}} />
      ) : (
        <View style={styles.container}>
          <Image source={{uri: movieDetails?.Poster}} style={styles.poster} />
          <Text style={styles.title}>{movieDetails?.Title}</Text>
          <Text style={styles.yearText}>{movieDetails?.Year}</Text>
          <Text
            style={
              styles.ratingText
            }>{`${movieDetails?.imdbRating}/10 (${movieDetails?.imdbVotes})`}</Text>
          <Text style={styles.plotText}>{movieDetails?.Plot}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: '80%',
    aspectRatio: 1 / 0.675,
  },
  container: {
    padding: 8,
  },
  title: {
    marginTop: 6,
    fontSize: 24,
    color: '#111111',
    fontWeight: 'bold',
  },
  yearText: {
    marginTop: 8,
    fontSize: 16,
    color: '#505050',
  },
  ratingText: {
    marginTop: 3,
    fontSize: 16,
    color: '#111111',
  },
  plotText: {
    fontSize: 14,
    color: '#505050',
    marginTop: 12,
  },
});
