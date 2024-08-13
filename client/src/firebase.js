// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "mern-blog-8797c.firebaseapp.com",
  projectId: "mern-blog-8797c",
  storageBucket: "mern-blog-8797c.appspot.com",
  messagingSenderId: "643164268693",
  appId: "1:643164268693:web:da637c49eb16255302139c",
};
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
