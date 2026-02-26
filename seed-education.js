import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const education = [
  {
    year: 2024,
    degree: "B.S.",
    field: "Computer Science & Mathematics",
    school: "Santa Clara University",
    startDate: "2022",
    endDate: "2026"
  }
];

console.log(`Uploading ${education.length} education entries...`);

for (const edu of education) {
  await addDoc(collection(db, "education"), edu);
  console.log(`  Added: ${edu.degree} ${edu.field} from ${edu.school}`);
}

console.log("Done! Refresh your app to see the education data.");
process.exit(0);
