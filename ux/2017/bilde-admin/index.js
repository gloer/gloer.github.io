
// HTML-elementer
const inpFil = document.querySelector("#inpFil");

// Bruker Firebase storage til å lagre bildet i databasen
const db = firebase.database();
const storage = firebase.storage(); // Til å lagrre bilder o.l.

function lagreBilde() {

    const bilde = inpFil.files[0];
    // Hvor skal vi lagre bildet
    const storageRef = storage.ref("bilder/" + ( +new Date() ) + bilde.name);

    storageRef.put(bilde)
        .then( fil => fil.ref.getDownloadURL() )
        .then( url => console.log(url) );
        

}

inpFil.addEventListener("change", lagreBilde);