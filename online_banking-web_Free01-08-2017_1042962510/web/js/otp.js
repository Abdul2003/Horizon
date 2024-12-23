import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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
const loginCode = Math.floor(1000 + Math.random() * 9000);
const loginCodeString = loginCode.toString();
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  let params = {
    message: "Your Login Code Is " + loginCodeString,
    email: user.email,
  };
  emailjs
    .send("service_ouaytu9", "template_u18ot1b", params)
    .then(console.log("successful"))
    .catch((error) => console.log(error));
  console.log("email function ran");
});

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (loginForm["code"].value == loginCodeString) {
    window.location = "/dashboard.html";
  } else {
    Swal.fire({
      title: "Error",
      text: "Incorrect OTP",
      icon: "error",
    });
  }
});
