import { initializeApp } from 'firebase/app';
import { initializeAuth,getAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCvUR1B6tVKUFRhB8V6NcSo1o4-jXGo0Wk",
    authDomain: "checkmate-1fddb.firebaseapp.com",
    projectId: "checkmate-1fddb",
    storageBucket: "checkmate-1fddb.appspot.com",
    messagingSenderId: "497273418555",
    appId: "1:497273418555:web:5796acd59100cbdc823d1e",
    measurementId: "G-QXK2P17VKL"
  };

export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(app);