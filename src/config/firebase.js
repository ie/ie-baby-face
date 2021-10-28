// import '@firebase/firestore';
import firebase from "@firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO9w27NALvv2a28ue61FHEtqMlN94kor8",
  authDomain: "baby-face-2021.firebaseapp.com",
  projectId: "baby-face-2021",
  databaseURL: 'https://baby-face-2021.firebaseio.com',
  storageBucket: "baby-face-2021.appspot.com",
  messagingSenderId: "966933873357",
  appId: "1:966933873357:web:c5d42e903e17e804e35f84"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

const settings = {
  timestampsInSnapshots: true,
}
db.settings(settings)
