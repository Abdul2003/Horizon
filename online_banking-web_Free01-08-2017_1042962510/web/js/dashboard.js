import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

const cardNumber = document.querySelector("#number");
const cvv = document.querySelector("#cvv");
const expiryDate = document.querySelector("#expiry");
const balance = document.querySelector("#balance");
const username = document.querySelector("#user-name");
const fullName = document.querySelector("#full-name");

//GET USER INFO
onAuthStateChanged(auth, async (user) => {
  const docRef = doc(db, "users", user.email);
  const docSnap = await getDoc(docRef);
  console.log(user.email);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    cardNumber.innerHTML = docSnap.data().number;
    cvv.innerHTML = docSnap.data().cvv;
    expiryDate.innerHTML = docSnap.data().expiry;
    username.innerHTML = `Hi, ` + docSnap.data().name;
    fullName.innerHTML = docSnap.data().name;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
});

//Logout
// const logOut = document.querySelector("#logout");
// logOut.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth.signOut();
//   window.location.href = "/login.html";
// });

//transfer button alert
// const transferBtn = document.querySelector("#transferBtn");
// transferBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   alert(
//     "Due to a suspicious activity going on on your account you have been suspended from going any further kindly send an email to our support team to resolve whatever issues you might be experiencing"
//   );
// });
