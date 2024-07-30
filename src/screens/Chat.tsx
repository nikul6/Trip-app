import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatList from '../components/ChatList'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getDocs, query, where } from 'firebase/firestore';
import { db, userRef } from '../firebase';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface UserData {
    email: string;
    userId: string;
    name: string
}

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">

export default function Chat({navigation}:ChatScreenProps) {

    const [allUser, setAllUser] = useState<UserData[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);

    // console.log("user ---> ", user)

    useEffect(() => {
        const getUser = async () => {
            const query1 = await query(userRef, where('userId', '!=', user?.uid));
            const querySnapshot = await getDocs(query1);
            let data: UserData[] = [];
            querySnapshot.forEach(doc => {
                console.log("doc  --> ", doc.data())
                data.push({ ...doc.data() } as UserData);
            })
            setAllUser(data)
            // console.log("data ", data)
        }
        getUser();
    }, [])

    return (
        <View>
            <Text>Chat</Text>
            {/* <ChatList/> */}
            <FlatList
                data={allUser}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flex: 1, margin: 10, borderWidth: 1 }} onPress={()=> navigation.navigate('ChatRoom', {id: item.userId, name: item.name})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            {/* {allUser.map((data)=>(
                <Text>{data.email}</Text>
            ))} */}
        </View>
    )
}

const styles = StyleSheet.create({})

// import { FlatList, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'

// interface ProdutData {
//     id: number;
//     title: string;
// }

// export default function Chat() {
//     const [data, setData] = useState<ProdutData[]>([]);

//     useEffect(()=>{
//         const getData = async () => {
//             const response = await fetch('https://fakestoreapi.com/products/');
//             const json = await response.json();
//             // console.log("data ",json )
//             setData(json)
//         }
//         getData();
//     },[])

//   return (
//     <View>
//       <FlatList
//         data={data}
//         renderItem={({item})=><Text>{item.title}</Text>}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({})