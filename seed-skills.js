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

const skills = [
  {
    category: "AI & LLMs",
    order: 1,
    items: [
      "ChatGPT",
      "Claude",
      "GitHub Copilot",
      "GPT-4",
      "Claude Sonnet",
      "Cursor AI",
      "Windsurf",
      "Prompt Engineering"
    ]
  },
  {
    category: "IDEs & Editors",
    order: 2,
    items: [
      "Cursor",
      "VS Code",
      "Jupyter Notebook"
    ]
  },
  {
    category: "CLIs & AI Agents",
    order: 3,
    items: [
      "Claude Code (CLI)",
      "Copilot CLI",
      "GitHub CLI",
      "AI Code Agents",
      "Terminal AI Assistants"
    ]
  },
  {
    category: "Languages",
    order: 4,
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C/C++",
      "SQL",
      "HTML/CSS",
      "R"
    ]
  },
  {
    category: "Frameworks & Libraries",
    order: 5,
    items: [
      "React",
      "Node.js",
      "Express",
      "Next.js",
      "TailwindCSS",
      "Firebase",
      "PostgreSQL"
    ]
  },
  {
    category: "Cloud & Infrastructure",
    order: 6,
    items: [
      "Firebase",
      "Google Cloud",
      "Docker",
      "Virtual Machines",
      "Linux",
    ]
  },
  {
    category: "Build Tools & DevOps",
    order: 7,
    items: [
      "Vite",
      "npm",
      "GitHub Actions",
      "Git"
    ]
  },
  {
    category: "Developer Tools",
    order: 8,
    items: [
      "GitHub",
      "Git",
      "VS Code Extensions",
      "Postman",
      "Chrome DevTools",
    ]
  },
  {
    category: "Soft Skills",
    order: 9,
    items: [
      "Technical Writing",
      "Cross-functional Collaboration",
      "Mentoring",
      "Public Speaking",
      "Project Management",
      "AI-Augmented Development"
    ]
  }
];

console.log(`Uploading ${skills.length} skill categories...`);

for (const skill of skills) {
  await addDoc(collection(db, "skills"), skill);
  console.log(`  Added: ${skill.category} (${skill.items.length} items)`);
}

console.log("Done! Refresh your app to see the skills.");
process.exit(0);
