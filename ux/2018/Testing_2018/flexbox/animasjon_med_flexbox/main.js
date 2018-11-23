


const bokser = document.querySelectorAll("main > div");

for (const [indeks, boks] of bokser.entries()) {

    console.log(boks);
    boks.style.animationDelay = indeks / 5 + "s";
}