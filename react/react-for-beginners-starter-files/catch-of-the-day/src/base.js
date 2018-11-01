import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC6BPiEOnbmUvB-QR4IxsIkwrU-n3sYBSw",
  authDomain: "catch-of-the-day-30344.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-30344.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
