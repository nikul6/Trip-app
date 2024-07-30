import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db, tripRef } from '../firebase';

export default function GetTrip() {
    const [allTrip, setAllTrip] = useState<Trip[]>([]);

    useEffect(() => {
        // One time updates
        const getUser = async () => {
            const query1 = await query(tripRef);
            const querySnapshot = await getDocs(query1);
            let data: Trip[] = [];
            querySnapshot.forEach(doc => {
                // console.log("doc ---> ", doc.data())
                data.push({ ...doc.data() } as Trip);
            })
            setAllTrip(data)
        }
        getUser();

        // Real time updates
        // const q = query(collection(db, "trip"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     let data: Trip[] = [];
        //     querySnapshot.forEach((doc) => {
        //         // console.log("data --- > ", doc.data())
        //         data.push({ ...doc.data() } as Trip);
        //       });
        //       setAllTrip(data)
        //     // console.log("querySnapshot ", querySnapshot.data())
        // });
        // return () => {
        //     unsubscribe();
        // }
    }, [])

    return (
        <View>
           
            {allTrip.map((data)=>(
                <>
                <Text>{data.tripName}</Text>
                <Text>{data.total}</Text>
                </>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({})