import '@firebase/firestore'

// Import the functions you need from the SDKs you need
import firebase from "@firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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


// 2020 Settings
// import firebase from '@firebase/app'
// import '@firebase/firestore'

// const config = {
//   apiKey: 'AIzaSyCFNcx3ykOUEAdav1JuHrC1_ftiLTXkGDo',
//   authDomain: 'baby-face-2020.firebaseapp.com',
//   databaseURL: 'https://baby-face-2020.firebaseio.com',
//   projectId: 'baby-face-2020',
//   storageBucket: 'baby-face-2020.appspot.com',
//   messagingSenderId: '216945882657',
// }

// firebase.initializeApp(config)
