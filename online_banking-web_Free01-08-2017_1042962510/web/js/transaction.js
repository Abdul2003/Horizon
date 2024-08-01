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

const transactionForm = document.getElementById("transactionFormBox");
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  console.log(user.email);
  transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      transactionForm["beneficiaryAccount"].value == "" ||
      transactionForm["beneficiaryBank"].value == "" ||
      transactionForm["amount"].value == ""
    ) {
      alert(`Empty Fields Not Allowed`);
    } else {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      var getDate = new Date();
      const account = transactionForm["beneficiaryAccount"].value;
      const bank = transactionForm["beneficiaryBank"].value;
      const amount = transactionForm["amount"].value;
      await updateDoc(doc(db, "Transactions", user.email), {
        Transaction: arrayUnion({
          date: getDate.toString(),
          account: account,
          bank: bank,
          amount: amount,
          status: "Pending",
        }),
      });
      Swal.fire({
        title: "Successful",
        text: "Transfer Sent",
        icon: "success",
      });
      transactionForm.reset();
    }
  });
});
