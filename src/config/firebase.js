import firebase from '@firebase/app'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyCFNcx3ykOUEAdav1JuHrC1_ftiLTXkGDo',
  authDomain: 'baby-face-2020.firebaseapp.com',
  databaseURL: 'https://baby-face-2020.firebaseio.com',
  projectId: 'baby-face-2020',
  storageBucket: 'baby-face-2020.appspot.com',
  messagingSenderId: '216945882657',
}

firebase.initializeApp(config)

export const db = firebase.firestore()

const settings = {
  timestampsInSnapshots: true,
}
db.settings(settings)
