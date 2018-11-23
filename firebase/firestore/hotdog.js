// Initialize Firebase
var config = {
    apiKey: "AIzaSyDX7_vsdMR6qbW807NMDafCM1m3RK_Gmrc",
    authDomain: "fire-my-store.firebaseapp.com",
    databaseURL: "https://fire-my-store.firebaseio.com",
    projectId: "fire-my-store",
    storageBucket: "fire-my-store.appspot.com",
    messagingSenderId: "377970988097"
  };
  firebase.initializeApp(config);

  const db = firebase.firestore();

  const docRef = db.doc("samples/sandwichData");

  const hotdogOutput = document.querySelector("#hotdogOutput");
  const inpStatus = document.querySelector("#inpStatus");
  const btn = document.querySelector("#btn");

  inpStatus.oninput = () => {
      const textToSave = inpStatus.value;
      docRef.set({
        status: textToSave
      });
  }

  const loadData = () => {
    docRef.onSnapshot(
        doc => {
            const myData = doc.data();
            hotdogOutput.innerText = myData.status;
        }
    );
  };

  loadData();