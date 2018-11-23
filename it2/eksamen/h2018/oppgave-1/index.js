// DOM-elementetr
const skjema = document.querySelector("#skjema");
const rbBarn = document.querySelector("#rbBarn");
const rbVoksen = document.querySelector("#rbVoksen");
const inpAntallDager = document.querySelector("#inpAntallDager");
const visType = document.querySelector("#visType");
const visDagpris = document.querySelector("#visDagpris");
const visRabatt = document.querySelector("#visRabatt");
const visPris = document.querySelector("#visPris");

function beregnPris() {
    // Finner den radioknappen som er valgt.
    // De har name=rb. Vi finner den som er valgt
    const rb = document.querySelector("[name=rb]:checked");

    // Henter ut verdier fra data-settet til radio-knappene
    // rb.dataset finner alle verdier som har
    // data-etEllerAnnet som attributt.
    const pris = Number(rb.dataset.pris);
    const tekst = rb.dataset.tekst;
    const antallDager = Number(inpAntallDager.value);

    const maksprisVoksen = 1000;
    const maksprisBarn = 500;

    let rabatt = 0;
    let total  =  antallDager * pris;

    // Sjekker om det er barn eller voksen
    const barn = (tekst === "Barn");
    const voksen = (tekst === "Voksen");
    
    if(barn && total > maksprisBarn) {
        rabatt = total - maksprisBarn;
        total = maksprisBarn;    
    }

    if(voksen && total > maksprisVoksen) {
        rabatt = total - maksprisVoksen;
        total = maksprisVoksen;
    }

    visType.innerHTML = tekst;
    visDagpris.innerHTML = "kr " + pris;
    visAntallDager.innerHTML = antallDager;
    visRabatt.innerHTML = "kr " + rabatt;
    visPris.innerHTML = "kr " + total; 

}


rbVoksen.onchange = beregnPris;
rbBarn.onchange = beregnPris;
inpAntallDager.oninput = beregnPris;


beregnPris();

// Passer på at skjemaet ikke sendes inn
skjema.onsubmit = evt => { 
    evt.preventDefault(); 
}