import { StyleSheet, View } from 'react-native';
import Router from './src/navigation/Router';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AuthListener from './src/AuthListener';
// import AuthProvider from './src/Context/AuthProvider';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <AuthListener>
        <View style={styles.container}>
          <Router />
        </View>
      </AuthListener>
    </Provider>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
