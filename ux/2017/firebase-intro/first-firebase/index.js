
const db = firebase.database();

// const bloggere = db.ref("bloggere");

// bloggere.push("Spohie Elise");

const bilene = db.ref("bilene");

const minVolvo = bilene.child("DJ12345");

minVolvo.set({
    merke: "Volvo",
    modell: "Amazon"
});

