import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatList from '../components/ChatList'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getDocs, query, where } from 'firebase/firestore';
import { db, userRef } from '../firebase';

interface UserData {
    email: string;
    userId: string
}

export default function Chat() {

    const [allUser, setAllUser] = useState<UserData[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);

    // console.log("user ---> ", user)

    useEffect(() => {
        const getUser = async () => {
            const query1 = await query(userRef, where('userId', '!=', user?.uid));
            const querySnapshot = await getDocs(query1);
            let data: UserData[] = [];
            querySnapshot.forEach(doc => {
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
                renderItem={({ item }) => <View>
                    <Text>{item.email}</Text>
                </View>}
            />
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