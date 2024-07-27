import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCS2jbtRL66n6chj7HaoO93Hc1lMiwj8XE",

  authDomain: "horizon-app-bfb68.firebaseapp.com",

  projectId: "horizon-app-bfb68",

  storageBucket: "horizon-app-bfb68.appspot.com",

  messagingSenderId: "730299809391",

  appId: "1:730299809391:web:eb2f9ef8d7ea2891cbd79a",

  measurementId: "G-1BMQ9354ED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//user login
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["username"].value;
  const password = loginForm["password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/dashboard.html";
      loginForm.reset();
    })
    .catch((error) => {
      alert(error.message);
    });
});
