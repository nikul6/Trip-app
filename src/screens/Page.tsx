import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import CharacterListItem from '../components/CharacterListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PageScreenProps = NativeStackScreenProps<RootStackParamList, 'Page'>;

export default function Page({}: PageScreenProps) {
  const [items, setItems] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [page]);

  const fetchItems = async () => {
    console.log("call")
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const json = await response.json();
      console.log("call1")
      // You can use either version here
      setItems((existingItems) => [...existingItems, ...json.results]);
      // OR
      // setItems((existingItems) => {
      //   return [...existingItems, ...json.results];
      // });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setItems([]); // Clear existing items to refresh from the first page
    setPage(1); // Reset page to 1
    fetchItems(); // Fetch new data
    setRefreshing(false);
  };

  const loadMoreItems = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CharacterListItem character={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#9Bd35A', '#689F38']}
              progressBackgroundColor="#FFFFFF"
            />
          }
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
