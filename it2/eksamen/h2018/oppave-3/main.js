const hytter = [
    {
        "navn" : "Granstua",
        "bilde" : "granstua.jpg",
        "utleid_jul" : true,
        "utleid_vinterferie" : true,
        "utleid_påske" : false
    }, 
    {
        "navn" : "Granbo",
        "bilde" : "granstua.jpg",
        "utleid_jul" : false,
        "utleid_vinterferie" : false,
        "utleid_påske" : true
    },
    {
        "navn" : "Grantoppen",
        "bilde" : "granstua.jpg",
        "utleid_jul" : true,
        "utleid_vinterferie" : false,
        "utleid_påske" : true
    },
    {
        "navn" : "Granhaug",
        "bilde" : "granstua.jpg",
        "utleid_jul" : true,
        "utleid_vinterferie" : false,
        "utleid_påske" : true
    }

];

const ledigTilJul = hytter.filter(hytte => !hytte.utleid_jul);
const ledigTilVinterferie = hytter.filter(hytte => !hytte.utleid_vinterferie);
const ledigTilPåske = hytter.filter(hytte => !hytte.utleid_påske);

const velg_ferieuke = document.querySelector("#velg_ferieuke");
const oversikt = document.querySelector("#oversikt")

function visLedigeHytter() {

    oversikt.innerHTML = "";
    if(velg_ferieuke.value === "") return;
    let ferie;
    if(velg_ferieuke.value === "jul") {
        ferie = ledigTilJul;
    } 
    else if(velg_ferieuke.value === "vinter") {
        ferie = ledigTilVinterferie;
    }
    else if(velg_ferieuke.value === "påske") {
        ferie = ledigTilPåske;
    }

    for(const hytte of ferie) {
        oversikt.innerHTML += `
        <div class="bilde">
            <img src="bilder/${hytte.bilde}">
        </div>        
        <div class="button" id="btnGrantoppen">BOOK DENNE HYTTA</div>
        `;
    }


}

function bookHytte(hytteID) {

}

velg_ferieuke.onchange = visLedigeHytter;