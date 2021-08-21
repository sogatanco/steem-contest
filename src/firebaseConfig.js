import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBT_Kj-Woyg5qUOUEHTsgxsJxs4P0PLy-A",
    authDomain: "steem-contest.firebaseapp.com",
    projectId: "steem-contest",
    storageBucket: "steem-contest.appspot.com",
    messagingSenderId: "459006218326",
    appId: "1:459006218326:web:b06b89caea4e4c31122bf7"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;