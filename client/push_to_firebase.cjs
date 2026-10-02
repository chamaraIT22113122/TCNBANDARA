const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const fs = require('fs');

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

// Read TS files as JSON
const readTsAsJson = (path, varName) => {
  const content = fs.readFileSync(path, 'utf8');
  const regex = new RegExp("export const " + varName + " = (\\\\[[\\\\s\\\\S]*?\\\\]);");
  const match = content.match(regex);
  if (match) {
    return JSON.parse(match[1]);
  }
  return [];
};

const oldProjects = readTsAsJson('./src/data/oldProjects.ts', 'oldProjects');
const oldEducation = readTsAsJson('./src/data/legacyData3.ts', 'oldEducation');
const oldExperience = readTsAsJson('./src/data/legacyData3.ts', 'oldExperience');
const oldSkills = readTsAsJson('./src/data/legacyData3.ts', 'oldSkills');

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
  await new Promise(r => setTimeout(r, 10000)); // wait 10s to ensure network flush
  process.exit(0);
}

migrate().catch(console.error);
