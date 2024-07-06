import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SafeAreaProvider,
} from 'react-native-safe-area-context';

//Screen Declaration
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
// import TheatreMap from '../screens/TheatreMap';
// import TheatreDetails from '../screens/TheatreDetails';
// import MoviesScreen from '../screens/MoviesScreen';
// import { AuthContext } from '../Context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function ScreenNavigation() {

    // const { isAuthenticated } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
            {/* {!isAuthenticated ? (
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen name="TheatreMap" component={TheatreMap} />
                    <Stack.Screen name="TheatreDetails" component={TheatreDetails} />
                    <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
                </>
            )} */}
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function Router() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <ScreenNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}