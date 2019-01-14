
// HTML-elementer
const inpFil = document.querySelector("#inpFil");
const skjema = document.querySelector("#skjema");
const inpTekst = document.querySelector("#inpTekst");
const main = document.querySelector("main");

// Bruker Firebase storage til å lagre bildet i databasen
const db = firebase.database();
const storage = firebase.storage(); // Til å lagre bilder o.l.

const bildearkiv = db.ref("bildearkiv");

function lagreBilde(evt) {
    evt.preventDefault();

    const tekst = inpTekst.value;
    const bilde = inpFil.files[0];
    // Hvor skal vi lagre bildet
    const storageRef = storage.ref("bilder/" + ( +new Date() ) + bilde.name);

    storageRef.put(bilde)
        .then( fil => fil.ref.getDownloadURL() )
        .then( url => {
            bildearkiv.push({
                url: url,
                tekst: tekst
            });
        } );
        

}

function visBilde(snap) {
    const data = snap.val();
    main.innerHTML = `
        <article id="${snap.key}">
            <img src="${data.url}">
            <p>${data.tekst}</p>
        </article>
    ` + main.innerHTML;
}

skjema.addEventListener("submit", lagreBilde);
bildearkiv.on("child_added", visBilde);