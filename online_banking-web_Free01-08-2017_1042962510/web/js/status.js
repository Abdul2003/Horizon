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
const db = getFirestore(app);
const params = new URLSearchParams(location.search);
const id = params.get("email");

const docRef = doc(db, "Transactions", id);
const docSnap = await getDoc(docRef);
console.log(docSnap);
const statusContainer = document.getElementById("statusContainer");

if (docSnap.exists()) {
  docSnap.data().Transaction.map((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const date = document.createElement("span");
    date.classList.add("date");
    date.innerHTML = item.date;

    const status = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const button1 = document.createElement("button");
    button1.setAttribute("class", "btn btn-success m-1");
    button1.textContent = "Success";
    const button2 = document.createElement("button");
    button2.setAttribute("class", "btn btn-warning m-1");
    button2.textContent = "Pending";
    const button3 = document.createElement("button");
    button3.textContent = "Failed";
    button3.setAttribute("class", "btn btn-danger m-1");
    buttonContainer.classList.add("button-container");
    status.innerHTML = `<ul>Beneficiary: ${item.account}</ul><ul>Bank: ${item.bank}</ul><ul>Amount: ${item.amount}</ul><ul>Status: ${item.status}</ul>`;

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    buttonContainer.appendChild(button3);
    cardBody.appendChild(date);
    cardBody.appendChild(buttonContainer);
    cardBody.appendChild(status);
    card.appendChild(cardBody);
    statusContainer.appendChild(card);

    function changeStatus(status) {
      updateDoc(docRef, {
        Transaction: arrayRemove({
          date: item.date,
          account: item.account,
          bank: item.bank,
          amount: item.amount,
          status: item.status,
        }),
      }),
        updateDoc(docRef, {
          Transaction: arrayUnion({
            date: item.date,
            account: item.account,
            bank: item.bank,
            amount: item.amount,
            status: status,
          }),
        });

      console.log("new status: " + status);
      console.log("current status: " + item.status);
      item.status = status;
    }
    button1.addEventListener("click", (e) => {
      e.preventDefault();
      changeStatus("Successful");
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Transaction Set To Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    button2.addEventListener("click", (e) => {
      e.preventDefault();
      changeStatus("Pending");
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Transaction Set To Pending",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    button3.addEventListener("click", (e) => {
      e.preventDefault();
      changeStatus("Failed");
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Transaction Set To Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  });
} else {
  statusContainer.innerHTML = "User Not Found";
}
