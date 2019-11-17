import firebase from '@firebase/app'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyBbX61eViiME-AdNOnDHr_nMHwn8IhpLWQ',
  authDomain: 'baby-face-2019.firebaseapp.com',
  databaseURL: 'https://baby-face-2019.firebaseio.com',
  projectId: 'baby-face-2019',
  storageBucket: 'baby-face-2019.appspot.com',
  messagingSenderId: '414414662276',
}

firebase.initializeApp(config)

export const db = firebase.firestore()

const settings = {
  timestampsInSnapshots: true,
}
db.settings(settings)
