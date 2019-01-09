// HTML-elementer
const skjema = document.querySelector("#skjema");
const inpMelding = document.querySelector("#inpMelding");
const secMeldinger = document.querySelector("#secMeldinger");


// Database-greier
const db = firebase.database();
const meldinger = db.ref("meldinger");

// Funksjon som legger en melding inn i databasen
function lagreMelding(evt) {
    evt.preventDefault();
    meldinger.push(inpMelding.value);
    skjema.reset();
}

// Funksjon som viser frem en melding
function visMelding(snap) {
    const melding = snap.val();
    secMeldinger.innerHTML += `<div>${melding}</div>`;
}

// Event Listeners
skjema.addEventListener("submit", lagreMelding);
meldinger.on("child_added", visMelding);



