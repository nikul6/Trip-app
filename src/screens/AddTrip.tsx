import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db, tripRef } from '../firebase';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AddTripScreenProps = NativeStackScreenProps<RootStackParamList, "AddTrip">

export default function AddTrip({navigation}: AddTripScreenProps) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Trip>();

    const addTrip = async (data: Trip) => {
        // Add id means create id
        // await setDoc(doc(db, "cities", "its id1"), data);
        // await setDoc(doc(tripRef, "its id1"), data);

        // Auto generated Id
        const docRef = await addDoc(collection(db, "trip"), {
            tripName: data.tripName,
            total: data.total
          });
          console.log("Document written with ID: ", docRef.id);
    };

    return (
        <View>
            <CustomInput
                name="tripName"
                placeholder="Trip Name"
                control={control}
                rules={{
                    required: 'tripName is required',
                }}
            />
            <CustomInput
                name="total"
                placeholder="Total"
                control={control}
                rules={{
                    required: 'total is required',
                }}
            />
            <CustomButton
                text={'Register'}
                onPress={handleSubmit(addTrip)}
            />
            <Pressable onPress={() => navigation.navigate('GetTrip')}>
        <Text>Add Trip</Text>
      </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})