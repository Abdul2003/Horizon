import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
//TRY LOGGING THIS FIRST TO MAKE SURE JS FILE IS LOADED BY HTML
console.log("fsf");
//auth and firestore references

const generateCardBtn = document.getElementById("generateCard");
const transactionPage = document.getElementById("transactionStatus");

generateCardBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  var email = document.getElementById("username").value;
  const db = getFirestore(app);
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  if (email == "") {
    alert("Empty Fields Not Allowed");
  } else {
    const number = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    );
    const cvv = Math.floor(100 + Math.random() * 900);
    var expMonth = Math.floor(Math.random() * (13 - 1) + 1);
    const expYear = Math.floor(Math.random() * (2030 - 2025) + 2025);

    const numberString = number.toString();
    const cvvString = cvv.toString();
    var expMonthString = expMonth.toString();
    const expYearString = expYear.toString();

    expMonth < 10 ? (expMonthString = `0${expMonth}`) : (expMonth = expMonth);
    if (docSnap.exists()) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "ATM Generated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      updateDoc(docRef, {
        number: numberString,
        cvv: cvvString,
        expiryMonth: expMonthString,
        expiryYear: expYearString,
      });
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "User Not Found",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});

transactionPage.addEventListener("click", async (e) => {
  e.preventDefault();
  var email = document.getElementById("username").value;
  const db = getFirestore(app);
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  if (email == "" || typeof email != "string") {
    alert("Empty Fields Not Allowed");
  } else {
    if (docSnap.exists()) {
      window.location = `/status.html?email=${email}`;
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "User Not Found",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});
