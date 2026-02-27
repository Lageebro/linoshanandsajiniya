// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC27axn6z66Byk8WwTNw4WK5KOdyiXzrT4",
    authDomain: "wedding-2baee.firebaseapp.com",
    projectId: "wedding-2baee",
    storageBucket: "wedding-2baee.firebasestorage.app",
    messagingSenderId: "881578860459",
    appId: "1:881578860459:web:9c5751e5b6908524427cee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

console.log("Firebase Database Initialized");
