// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // <- IMPORTANTE

const firebaseConfig = {
  apiKey: "AIzaSyD5nw0fdSwuN9BiA8q5rztMlVeY43twDBE",
  authDomain: "sensoresesp-6f166.firebaseapp.com",
  databaseURL: "https://sensoresesp-6f166-default-rtdb.firebaseio.com",
  projectId: "sensoresesp-6f166",
  storageBucket: "sensoresesp-6f166.firebasestorage.app",
  messagingSenderId: "880833389958",
  appId: "1:880833389958:web:58e117c30447774093f807",
  measurementId: "G-Z2YYTMS5ZB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa serviços Firebase
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
