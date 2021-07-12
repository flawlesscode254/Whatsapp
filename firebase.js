import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP-v7N1Dhfw-vuLjUPvxOgijghROpIhIc",
  authDomain: "whatsapp-75482.firebaseapp.com",
  projectId: "whatsapp-75482",
  storageBucket: "whatsapp-75482.appspot.com",
  messagingSenderId: "848815356738",
  appId: "1:848815356738:web:00ce2d22a2399d45e266db"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()
const store = firebase.storage()

export default db
export { store, auth }