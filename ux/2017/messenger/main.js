
// HTML-elementer:
const secMeldinger = document.querySelector("#secMeldinger");
const skjema = document.querySelector("#skjema");
const inpMelding = document.querySelector("#inpMelding");

const db = firebase.database();
const meldinger = db.ref("minemessengermeldinger2");


// Definerer en bruker
let user;

// Sjekker om vi er logget inn
firebase.auth().onAuthStateChanged( newuser => {
    if (newuser) {
        // Setter user til den innloggede brukeren
        user = newuser;
    } else {
        document.body.innerHTML = `
            <main class="notloggedin">
                <h1>Du er ikke logget inn</h1>
                <a href="login.html">Logg inn her</a>
            </main>            
        `;
    }
});

function lagreMelding(evt) {
    evt.preventDefault();

    // Legger inn melding
    meldinger.push({
        tekst: inpMelding.value,
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName
    });

    skjema.reset();

}

function visMelding(snap) {

    const melding = snap.val();

    let klasse = "others";
    if(melding.uid === user.uid) {
        klasse = "me";
    }

    let bilde = melding.photoURL;
    if(!bilde) {
        bilde = "anonym.png";
    }

    secMeldinger.innerHTML += `
        <div class="${klasse}">
            <img src="${bilde}" title="${melding.displayName}">
            <span>${melding.tekst}</span>
        </div>
    `;


}


// Event Listeners
skjema.addEventListener("submit", lagreMelding);
meldinger.on("child_added", visMelding);

