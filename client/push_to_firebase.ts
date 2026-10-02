import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { oldProjects } from './src/data/oldProjects.ts';
import { oldEducation, oldExperience, oldSkills } from './src/data/legacyData3.ts';

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

async function migrate() {
  console.log("Starting full data migration to Firestore...");
  
  for (const p of oldProjects) {
    await addDoc(collection(db, "projects"), p);
    console.log("Added project:", p.title);
  }
  for (const p of oldEducation) {
    await addDoc(collection(db, "education"), p);
    console.log("Added education:", p.title);
  }
  for (const p of oldExperience) {
    await addDoc(collection(db, "experience"), p);
    console.log("Added experience:", p.company);
  }
  for (const p of oldSkills) {
    await addDoc(collection(db, "skills"), p);
    console.log("Added skills category:", p.category);
  }
  
  console.log("Migration completely finished! Waiting for flush...");
  await new Promise(r => setTimeout(r, 10000));
  process.exit(0);
}

migrate().catch(console.error);
