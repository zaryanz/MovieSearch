import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export const SearchHistory = ({route}) => {
  const searchHistory = route?.params?.searchHistory;

  const renderSearchHistoryItem = ({item, index}) => {
    return (
      <View style={styles.historyItemContainer}>
        <Text>{item?.searchTitle}</Text>
        <Text>{new Date(item?.timestamp)?.toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={searchHistory.reverse()}
        renderItem={renderSearchHistoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyItemContainer: {
    padding: 8,
  },
});
