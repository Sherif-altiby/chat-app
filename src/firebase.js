import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcdLPGr-88ZQxJfEdCAzpGUnqzdDCN5Yg",
  authDomain: "chat-fe802.firebaseapp.com",
  projectId: "chat-fe802",
  storageBucket: "chat-fe802.appspot.com",
  messagingSenderId: "277295800045",
  appId: "1:277295800045:web:085966730497276f2936e4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()