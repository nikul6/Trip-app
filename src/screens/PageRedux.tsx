// import React, { useEffect, useState } from 'react';
// import { FlatList, ActivityIndicator, StyleSheet, View, Text, RefreshControl } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store';
// import { clearCharacters, fetchCharacters } from '../redux/characters/charactersSlice';
// import CharacterListItem from '../components/CharacterListItem';

// const CharacterList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const characters = useSelector((state: RootState) => state.characters.characters);
//   const loading = useSelector((state: RootState) => state.characters.loading);
//   const [page, setPage] = useState(1); // Initial page
//   const [refreshing, setRefreshing] = useState(false);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);

//   console.log("characters ", characters)


//   useEffect(() => {
//     console.log("call ")
//     dispatch(fetchCharacters(page));
//   }, []);

//   const loadMoreCharacters = () => {
//     if (!isFetchingMore) {
//       setIsFetchingMore(true);
//       dispatch(fetchCharacters(page + 1)).then(() => {
//         setPage(prevPage => prevPage + 1); // Increment page after successful fetch
//         setIsFetchingMore(false);
//       });
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setPage(1); // Reset to first page
//     dispatch(clearCharacters()); // Clear existing characters
//     dispatch(fetchCharacters(1)).then(() => {
//       setRefreshing(false);
//     });
//   };

// const renderData = ({item} : {item: Character}) => <CharacterListItem character={item} />

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={characters as Character[]}
//         renderItem={({ item }) => <CharacterListItem character={item} />}
//         keyExtractor={(item) => item.id.toString()}
//         onEndReached={loadMoreCharacters}
//         onEndReachedThreshold={0.1}
//         ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             colors={['#9Bd35A', '#689F38']}
//             progressBackgroundColor="#FFFFFF"
//           />
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CharacterList;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function PageRedux() {
//   return (
//     <View>
//       <Text>PageRedux</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})