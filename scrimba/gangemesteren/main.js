const divRegnestykke = document.getElementById('divRegnestykke');
const txtScore = document.getElementById('txtScore');
const inpSvar = document.getElementById('inpSvar');

const keyframes = [
    {top: "-4rem"},
    {top: "21rem"}
];

const settings = {
    duration: 8000,
    easing: "linear",
    fill: "forwards"
}

let fasit = 4;
let poeng = 0;
let fart = 1;
let theGameIsOver = false;

const animasjon = divRegnestykke.animate(keyframes, settings);
animasjon.currentTime = 2000;
animasjon.pause();
const lagRegnestykke = () => {

    if(theGameIsOver) {
        // Breaks out of the function
        return;
    }

    // Generate two random integers between 1 and 9
    const f1 = Math.ceil(Math.random() * 9);
    const f2 = Math.ceil(Math.random() * 9);
    fasit = f1 * f2;
    divRegnestykke.innerHTML = `${f1} · ${f2}`;
    animasjon.currentTime = 0;
    poeng++;
    fart += 0.1;

    txtScore.innerHTML = poeng;
    animasjon.playbackRate = fart;

}

animasjon.onfinish = () => {
    theGameIsOn = false;
}

inpSvar.oninput = () => {
    const svar = Number(inpSvar.value);
    if(svar === fasit) {

        lagRegnestykke();
        inpSvar.value = "";

    }
}

//lagRegnestykke();