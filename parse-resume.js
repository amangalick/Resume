import { readFileSync } from "fs";
import { createRequire } from "module";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// pdf-parse uses CommonJS
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

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
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error("Usage: node parse-resume.js <path-to-resume.pdf>");
  process.exit(1);
}

console.log("Reading PDF...");
const pdfBuffer = readFileSync(pdfPath);
const { text } = await pdfParse(pdfBuffer);

console.log("Extracting experience with AI...");
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `Extract all work experience from this resume and return a JSON array.
Each item must have exactly these fields:
- year: number (the start year of the role)
- endYear: number or the string "Present" (the end year of the role, or "Present" if current)
- role: string (job title)
- company: string (company name)
- description: array of strings (bullet points of responsibilities/achievements)

Return only valid JSON, no markdown or extra text.`
    },
    {
      role: "user",
      content: text
    }
  ]
});

const parsed = JSON.parse(response.choices[0].message.content);
console.log(`\nFound ${parsed.length} experience entries:`);
parsed.forEach(item => console.log(`  - ${item.role} @ ${item.company} (${item.year})`));

console.log("\nUploading to Firestore...");
for (const item of parsed) {
  await addDoc(collection(db, "experience"), item);
  console.log(`  Added: ${item.role} @ ${item.company}`);
}

console.log("\nDone! Refresh your app to see the data.");
process.exit(0);
