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
// Done initializing


const linkKamp = document.getElementById('linkKamp');
const btnHjemmeGoal = document.getElementById('btnHjemmeGoal');
const btnBorteGoal = document.getElementById('btnBorteGoal');
const btnHjemmeCorner = document.getElementById('btnHjemmeCorner');
const btnBorteCorner = document.getElementById('btnBorteCorner');
const btnHjemmeGult = document.getElementById('btnHjemmeGult');
const btnBorteGult = document.getElementById('btnBorteGult');
const regHendelse = document.getElementById('regHendelse');
const inpHendelse = document.getElementById('inpHendelse');
const nyKamp = document.getElementById('nyKamp');
const btnVisNyKamp = document.getElementById('btnVisNyKamp');
const btnFb = document.getElementById("btnFb");
const btnFbOverlay = document.getElementById('btnFbOverlay');
const overlay = document.getElementById('overlay');
const watch = document.getElementById('watch');
const watch2 = document.getElementById('watch2');
const watch3 = document.getElementById('watch3');
const watch4 = document.getElementById('watch4');
const inpKampstart = document.getElementById('inpKampstart');
const infoFerdig = document.getElementById('infoFerdig');
const taKampinfo = document.getElementById('taKampinfo');
const startSkjema = document.getElementById('startSkjema');
const inpHjemmelag = document.getElementById('inpHjemmelag');
const inpBortelag = document.getElementById('inpBortelag');

const db = firebase.database();
const kamper = db.ref("kamper");

let start = 0;
let key = null;

let omgang = 1;
let pause = false;

let kampen;
let hendelser;

let hjemmelag;
let bortelag;

btnBorteCorner.disabled = true;
btnHjemmeCorner.disabled = true;
btnBorteGoal.disabled = true;
btnHjemmeGoal.disabled = true;
btnHjemmeGult.disabled = true;
btnBorteGult.disabled = true;

if(localStorage.myGameID) {


    nyKamp.style.display = "none";

    kampen = kamper.child(localStorage.myGameID);            
    hendelser = kampen.child("hendelser");
    key = localStorage.myGameID;

    btnBorteCorner.disabled = false;
    btnHjemmeCorner.disabled = false;
    btnBorteGoal.disabled = false;
    btnHjemmeGoal.disabled = false;
    btnHjemmeGult.disabled = false;
    btnBorteGult.disabled = false;


    kampen.on("value", snap => {
        const data = snap.val();
        console.log("DATA: " + data.hjemmelag);
        hjemmelag = data.hjemmelag;
        bortelag = data.bortelag;
        document.querySelector("#kampinfo .hjemmelag").innerText = data.hjemmelag;
        document.querySelector("#kampinfo .bortelag").innerText = data.bortelag;                
        btnHjemmeGoal.innerText = "Mål til " + hjemmelag;
        btnBorteGoal.innerText = "Mål til " + bortelag;
        btnHjemmeCorner.innerText = "Corner til " + hjemmelag;
        btnBorteCorner.innerText = "Corner til " + bortelag;
        btnHjemmeGult.innerText = "Gult kort til " + hjemmelag;
        btnBorteGult.innerText = "Gult kort til " + bortelag;
        linkKamp.href = "game.html?id=" + snap.key;
        document.querySelector("title").innerHTML = hjemmelag + " - " + bortelag;

        const status = data.status;

        if(status === "1_omgang_spilles") {
            watch2.style.display = "inline-block";    
            watch3.style.display = "none";
            watch4.style.display = "none";
        }
        
        if(status === "2_omgang_spilles") {
            watch2.style.display = "none";    
            watch3.style.display = "none";
            watch4.style.display = "inline-block";
            omgang = 2;
            console.log(omgang);

            btnBorteCorner.disabled = false;
            btnHjemmeCorner.disabled = false;
            btnBorteGoal.disabled = false;
            btnHjemmeGoal.disabled = false;
            btnHjemmeGult.disabled = false;
            btnBorteGult.disabled = false;

        }
        
        if(status === "pause") {
            watch2.style.display = "none";
            watch3.style.display = "inline-block";
            watch4.style.display = "none";
            pause = true;

            btnHjemmeGoal.disabled = true;
            btnBorteGoal.disabled = true;
            btnHjemmeCorner.disabled = true;
            btnBorteCorner.disabled = true;
            btnHjemmeGult.disabled = true;
            btnBorteGult.disabled = true;

        } else {
            pause = false;
        }
        if(status === "kampen_er_ferdig") {
            watch2.style.display = "none";
            watch3.style.display = "none";
            watch4.style.display = "none";
            infoFerdig.style.display = "inline-block";
            pause = true;

            btnHjemmeGoal.disabled = true;
            btnBorteGoal.disabled = true;
            btnHjemmeCorner.disabled = true;
            btnBorteCorner.disabled = true;
            btnHjemmeGult.disabled = true;
            btnBorteGult.disabled = true;

            
        }
        
    });
} else {
    console.log("Oppretter en ny kamp");
    // This is the first time the app launches on this device
    // We go directly to the add new Game
    nyKamp.style.display = "block";
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.querySelector("footer").style.display = "none";


}

startSkjema.onsubmit = (evt) => {

    evt.preventDefault();

    nyKamp.style.display = "none";
    overlay.style.display = "flex";

    document.querySelector("header").style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("footer").style.display = "block";

    btnHjemmeGoal.disabled = false;
    btnBorteGoal.disabled = false;
    btnHjemmeCorner.disabled = false;
    btnBorteCorner.disabled = false;
    btnHjemmeGult.disabled = false;
    btnBorteGult.disabled = false;

    watch2.style.display = "inline-block";    
    watch3.style.display = "none";
    watch4.style.display = "none";
    infoFerdig.style.display = "none";

    kamper.push({
        start_tid: 0, //firebase.database.ServerValue.TIMESTAMP,
        hjemmelag: inpHjemmelag.value,
        bortelag: inpBortelag.value,
        hjemmegoal: 0,
        bortegoal: 0,
        status: "ikke_startet",
        kampstart: inpKampstart.value,
        start_tid_2_omgang: 0
    }).then(
        snap => { 
            key = snap.key; 
            linkKamp.href="game.html?id=" + snap.key; 
            linkKamp.style.display = "inline-block";                    
            btnHjemmeGoal.innerText = "Mål til " + inpHjemmelag.value;
            btnBorteGoal.innerText = "Mål til " + inpBortelag.value;
            btnHjemmeCorner.innerText = "Corner til " + inpHjemmelag.value;
            btnBorteCorner.innerText = "Corner til " + inpBortelag.value;
            btnHjemmeGult.innerText = "Gult kort til " + inpHjemmelag.value;
            btnBorteGult.innerText = "Gult kort til " + inpBortelag.value;
            document.querySelector("#kampinfo .hjemmelag").innerText = inpHjemmelag.value;
            document.querySelector("#kampinfo .bortelag").innerText = inpBortelag.value;

            hjemmelag = inpHjemmelag.value;
            bortelag = inpBortelag.value;
            localStorage.myGameID = snap.key;
            document.querySelector("title").innerHTML = hjemmelag + " - " + bortelag;

            kampen = kamper.child(key);
            hendelser = kampen.child("hendelser");

            hendelser.on("child_added", (snap) => {
                const data = snap.val();
                document.querySelector("#secSisteHendelser").innerHTML = data.tekst;
            });

            hendelser.push({
                type: "startcomment",
                tekst: taKampinfo.value,
                tidspunkt: 0
            });

            
        }
    );
    

}

btnFb.onclick = () => {
    console.log(key);
    const url = "http://gloer.github.io/live/game.html?id=" + key;
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + "&t="+document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; 
    
}   

btnFbOverlay.onclick = () => {
    console.log(key);
    const url = "http://gloer.github.io/live/game.html?id=" + key;
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + "&t="+document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; 
    
}           

btnVisNyKamp.onclick = () => {

    console.log("HALLO");

    nyKamp.style.display = "block";
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.querySelector("footer").style.display = "none";
}

btnHjemmeGoal.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");
    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "goal",
        pause: pause,
        goaler: "home",
        tekst: "<div>Mål til " + hjemmelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    inpHendelse.value = "";
    
}

btnHjemmeGult.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");

    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "yellowcard",
        goaler: "home",
        pause: pause,
        tekst: "<div>Gult kort til " + hjemmelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    inpHendelse.value = "";
    
}

btnBorteGult.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");

    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "yellowcard",
        goaler: "away",
        pause: pause,
        tekst: "<div>Gult kort til " + bortelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    inpHendelse.value = "";
    
}

btnHjemmeCorner.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");

    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "corner",
        goaler: "home",
        pause: pause,
        tekst: "<div>Corner til " + hjemmelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });
    
    inpHendelse.value = "";
}

btnBorteCorner.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");

    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "corner",
        goaler: "away",
        pause: pause,
        tekst: "<div>Corner til " + bortelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    inpHendelse.value = "";
    
}

btnBorteGoal.onclick = () => {
    kampen = kamper.child(key);
    hendelser = kampen.child("hendelser");

    let ekstra = "";
    if(inpHendelse.value != "") {
        ekstra = "<span>" + inpHendelse.value + "</span>";
    }

    hendelser.push({
        type: "goal",
        goaler: "away",
        pause: pause,
        tekst: "<div>Mål til " + bortelag + "!</div> " + ekstra,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    inpHendelse.value = "";
    
}

regHendelse.onsubmit = (evt) => {
    evt.preventDefault();
    hendelser.push({
        type: "comment",
        tekst: inpHendelse.value,
        pause: pause,
        tidspunkt: firebase.database.ServerValue.TIMESTAMP,
        omgang: omgang
    });

    

    regHendelse.reset();
}


hendelser.on("child_added", (snap) => {
    const data = snap.val();
    document.querySelector("#secSisteHendelser").innerHTML = data.tekst;
});


document.querySelector("#watch").onclick = () => {

    document.querySelector("#overlay").style.display = "none";

    kampen.update({
        start_tid: firebase.database.ServerValue.TIMESTAMP,
        status: "1_omgang_spilles"
    });

    hendelser.push({                
        type: "comment",
        tekst: "Da er vi i gang",
        tidspunkt: firebase.database.ServerValue.TIMESTAMP
    });

    document.querySelector("#watch").style.display = "none";

    
}

watch2.onclick = () => {
    kampen.update({
        status: "pause"     
    });

    watch2.style.display = "none";
    watch3.style.display = "inline-block";
    pause = true;

    hendelser = kampen.child("hendelser");

    hendelser.push({
        type: "startcomment",        
        tekst: "Da er det pause",
        tidspunkt: firebase.database.ServerValue.TIMESTAMP
    });

    inpHendelse.value = "";

    btnHjemmeGoal.disabled = true;
    btnBorteGoal.disabled = true;
    btnHjemmeCorner.disabled = true;
    btnBorteCorner.disabled = true;
    btnHjemmeGult.disabled = true;
    btnBorteGult.disabled = true;

}

watch3.onclick = () => {
    kampen.update({
        status: "2_omgang_spilles",
        start_tid_2_omgang: firebase.database.ServerValue.TIMESTAMP
    });
    pause = false;
    omgang = 2; // Bytter til 2. omgang
    watch3.style.display = "none";
    watch4.style.display = "inline-block";

    hendelser = kampen.child("hendelser");

    hendelser.push({
        type: "startcomment",        
        tekst: "Da er vi i gang med 2. omgang",
        tidspunkt: firebase.database.ServerValue.TIMESTAMP
    });

    btnBorteCorner.disabled = false;
    btnHjemmeCorner.disabled = false;
    btnBorteGoal.disabled = false;
    btnHjemmeGoal.disabled = false;
    btnHjemmeGult.disabled = false;
    btnBorteGult.disabled = false;


}

watch4.onclick = () => {
    kampen.update({
        status: "kampen_er_ferdig"        
    });
    watch4.style.display = "none";
    pause = true;

    hendelser = kampen.child("hendelser");

    hendelser.push({
        type: "startcomment",        
        tekst: "Da er kampen ferdig",
        tidspunkt: firebase.database.ServerValue.TIMESTAMP
    });

    btnHjemmeGoal.disabled = true;
    btnBorteGoal.disabled = true;
    btnHjemmeCorner.disabled = true;
    btnBorteCorner.disabled = true;
    btnHjemmeGult.disabled = true;
    btnBorteGult.disabled = true;
}


