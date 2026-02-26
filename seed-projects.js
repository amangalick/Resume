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

const projects = [
  {
    order: 1,
    name: "AI-Powered Resume Website",
    description: "Built this interactive resume site using React, Firebase, and Vite. Leveraged GitHub Copilot and Cursor for rapid development. Features dark mode, story/recruiter view toggle, and skill-based project filtering.",
    tech: ["React", "Firebase", "Vite", "JavaScript", "CSS"],
    link: "https://github.com/amangalick/Resume"
  },
  {
    order: 2,
    name: "Data Analysis Pipeline",
    description: "Created Python pipeline for processing and visualizing large datasets. Used AI pair programming to accelerate development and implement best practices. Includes automated testing and documentation.",
    tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    link: "https://github.com/amangalick/DataScienceProject",
  },
];

console.log(`Uploading ${projects.length} projects...`);

for (const project of projects) {
  await addDoc(collection(db, "projects"), project);
  console.log(`  Added: ${project.name}`);
}

console.log("Done! Refresh your app to see the projects.");
process.exit(0);
