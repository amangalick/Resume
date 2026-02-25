import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "steel-capsule-427323-f6.firebaseapp.com",
  projectId: "steel-capsule-427323-f6",
  storageBucket: "steel-capsule-427323-f6.firebasestorage.app",
  messagingSenderId: "1012240877375",
  appId: "1:1012240877375:web:00d09b0509b631f4f8358a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const fetchExperience = async () => {
  const q = query(collection(db, "experience"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchEducation = async () => {
  try {
    const q = query(collection(db, "education"), orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
};

export const fetchSkills = async () => {
  try {
    const q = query(collection(db, "skills"), orderBy("order"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
};

export const fetchProjects = async () => {
  try {
    const q = query(collection(db, "projects"), orderBy("order"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
};

export const fetchCertifications = async () => {
  try {
    const snapshot = await getDocs(collection(db, "certifications"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
};