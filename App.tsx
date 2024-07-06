import { StyleSheet, View } from 'react-native';
import Router from './src/navigation/Router';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
      // <AuthProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <Router />
        </View>
        </Provider>
      // </AuthProvider>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
