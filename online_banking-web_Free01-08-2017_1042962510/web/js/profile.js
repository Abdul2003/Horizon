import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
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

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const dob = document.querySelector("#dob");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const zip = document.querySelector("#zip");
const maiden = document.querySelector("#maiden");
const state = document.querySelector("#state");
const email = document.querySelector("#email");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);

  console.log(user.email);

  if (userDocSnap.exists()) {
    console.log("Document data:", userDocSnap.data());
    firstName.value = userDocSnap.data().firstName;
    lastName.value = userDocSnap.data().lastName;
    dob.value = userDocSnap.data().dob;
    phone.value = userDocSnap.data().phone;
    address.value = userDocSnap.data().address;
    zip.value = userDocSnap.data().zip;
    maiden.value = userDocSnap.data().maiden_name;
    state.value = userDocSnap.data().state;
    email.value = user.email;
    city.value = userDocSnap.data().city;
    country.value = userDocSnap.data().country;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
});
