// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAyna8YDGgklqoXEAoAQzT9mXvSXHkTqrY",
//   authDomain: "baby-face-2023.firebaseapp.com",
//   projectId: "baby-face-2023",
//   storageBucket: "baby-face-2023.appspot.com",
//   databaseURL: 'https://baby-face-2023.firebaseio.com',
//   messagingSenderId: "526380366376",
//   appId: "1:526380366376:web:244c593330b16871ffd31d",
//   measurementId: "G-Q4HMBSR4NF"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADaXUGW3H6AhpzSEI_y7LAE9dCiZWSha8",
  authDomain: "ie-baby-face-2025.firebaseapp.com",
  projectId: "ie-baby-face-2025",
  storageBucket: "ie-baby-face-2025.firebasestorage.app",
  messagingSenderId: "832827875045",
  appId: "1:832827875045:web:97e1f272c1195708663e0c",
  databaseURL: 'https://ie-baby-face-2025-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = firebase.firestore()
export const db = getDatabase(app)

const settings = {
  timestampsInSnapshots: true,
}
db.settings(settings)