import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
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
const app = initializeApp(firebaseConfig);

const cardForm = document.getElementById("cardFormBox");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Users", user.email);
  const docSnap = await getDoc(docRef);
  cardForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      cardForm["numberField"].value == "" ||
      cardForm["cvvField"].value == "" ||
      cardForm["expiryField"].value == ""
    ) {
      alert("Empty Fields Not Allowed");
    } else {
      updateDoc(docRef, {
        physicalAtmStatus: "Active",
      });

      Swal.fire({
        title: "Success",
        text: "Card Has Been Successfully Activated",
        icon: "success",
      });
      cardForm.reset();
    }
  });
});
