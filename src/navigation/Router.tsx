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
import Page from '../screens/Page';
import PageRedux from '../screens/PageRedux';
import Chat from '../screens/Chat';
import AddTrip from '../screens/AddTrip';
import GetTrip from '../screens/GetTrip';
import ChatRoom from '../screens/ChatRoom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import { useAuth } from '../Context/AuthProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

function ScreenNavigation() {

    const user = useSelector((state: RootState) => state.auth.user);
    // const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
                    <Stack.Screen name="Page" component={Page} options={{ headerShown: false }} />
                    <Stack.Screen name="PageRedux" component={PageRedux} options={{ headerShown: false }} />
                    <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name="AddTrip" component={AddTrip} options={{ headerShown: true }} />
                    <Stack.Screen name="GetTrip" component={GetTrip} options={{ headerShown: true }} />
                    <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: true }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            )}

            {/* {isAuthenticated ?
                <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} /> :
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            } */}

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