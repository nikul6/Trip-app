import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">

export default function Home({}: HomeScreenProps) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({})