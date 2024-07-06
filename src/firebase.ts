// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, getAuth, initializeAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBsJJfmzl_XBRle7OHoUyeIVM03uMofC8",
  authDomain: "trip-app-4adb0.firebaseapp.com",
  projectId: "trip-app-4adb0",
  storageBucket: "trip-app-4adb0.appspot.com",
  messagingSenderId: "430973189708",
  appId: "1:430973189708:web:a40b7f5c7737669cf1bee9",
  measurementId: "G-ED1V6YNZS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const userRef = collection(db, "users")