const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

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
const db = getFirestore(app);

async function check() {
  const pSnap = await getDocs(collection(db, "projects"));
  console.log("Projects:", pSnap.size);
  
  const eSnap = await getDocs(collection(db, "education"));
  console.log("Education:", eSnap.size);
  
  const exSnap = await getDocs(collection(db, "experience"));
  console.log("Experience:", exSnap.size);
  
  const sSnap = await getDocs(collection(db, "skills"));
  console.log("Skills:", sSnap.size);
  
  process.exit(0);
}

check().catch(console.error);
