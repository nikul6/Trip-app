import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/auth/authSlice';
// import { useAuth } from '../Context/AuthProvider';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">

export default function Home({ navigation }: HomeScreenProps) {

  const dispatch = useDispatch<AppDispatch>();

  const Logout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  // Context logout
  // const { logoutWithContext } = useAuth();

  // const Logout = async () => {
  //   try {
  //     await logoutWithContext();
  //   } catch (error) {
  //     console.error('Failed to log out:', error);
  //   }
  // }

  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={Logout}>
        <Text>Logout</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Page')}>
        <Text>Page</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('PageRedux')}>
        <Text>PageRedux</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Chat')}>
        <Text>Chat</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})