import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>;
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
//User Signup
const signupForm = document.querySelector("#signupForm");
console.log(auth);
signupForm.addEventListener("submit", () => {
  //get user info
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const firstName = signupForm["first_name"].value;
  const lastName = signupForm["last_name"].value;
  const inputValidation = document.querySelector(".input-validation");
  if (password.length < 6) {
    inputValidation.style.display = "block";
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
        setDoc(doc(db, "Users", email), {
          firstName: firstName,
          lastName: lastName,
        }).then(function () {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            window.location = "/login.html";
          }, 1500);
          signupForm.reset();
        });
      })

      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  }
});
