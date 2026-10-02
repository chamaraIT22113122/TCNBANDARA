import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyJ39Uz5O448ylc-kBebOrnoqM4ZAzYq8",
  authDomain: "tcn-bandara.firebaseapp.com",
  projectId: "tcn-bandara",
  storageBucket: "tcn-bandara.firebasestorage.app",
  messagingSenderId: "1071640750327",
  appId: "1:1071640750327:web:6eb8600747836b8750cbf2",
  measurementId: "G-TTLEPF3WSS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
