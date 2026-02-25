import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { readFileSync } from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyBNWts5DDZZwGtctl_UADCVNjFFnFB7vXc",
  authDomain: "steel-capsule-427323-f6.firebaseapp.com",
  projectId: "steel-capsule-427323-f6",
  storageBucket: "steel-capsule-427323-f6.firebasestorage.app",
  messagingSenderId: "1012240877375",
  appId: "1:1012240877375:web:00d09b0509b631f4f8358a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const data = JSON.parse(readFileSync("./resume-data.json", "utf8"));

console.log(`Uploading ${data.length} experience entries...`);

for (const item of data) {
  await addDoc(collection(db, "experience"), item);
  console.log(`  Added: ${item.role} @ ${item.company} (${item.year})`);
}

console.log("Done! Refresh your app to see the data.");
process.exit(0);
