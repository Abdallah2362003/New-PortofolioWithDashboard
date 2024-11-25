// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB49DMl6JIoWS90ogPv7C7r-1RoNWFG120",
    authDomain: "ahmed-adel-portfolio-a3338.firebaseapp.com",
    projectId: "ahmed-adel-portfolio-a3338",
    storageBucket: "ahmed-adel-portfolio-a3338.firebasestorage.app",
    messagingSenderId: "114145446965",
    appId: "1:114145446965:web:5d310c80c74a471e10f57c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
