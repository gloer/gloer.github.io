const main = document.querySelector("main");

// Fikser linkene i toppen, sånn at du ser hvor du er

let linker = document.querySelectorAll("header a");
// Dette er en node-liste. Vi gjør den om til et array
linker = Array.from(linker);

function settValgtLink(link) {

    link.classList.add("valgt");

    // Finner alle de andre lenkene med et filter
    const andreLinker = linker.filter(lenke => lenke.href != link.href);
    
    // Tar vekk valgt-klasse fra de andre linkene
    for(const l of andreLinker) {
        l.classList.remove("valgt");
    }

}

// Kobler funksjonen til alle lenkene
for(const link of linker) {
    link.onclick = evt => {
        settValgtLink(evt.target);
    }
}


// Passer på å oppdatere valgene også når vi scroller
main.onscroll = function() {

    console.log(main.scrollTop);

    if(main.scrollTop >= 3 * innerHeight) {
        settValgtLink(linker[3]);
    } 
    else if(main.scrollTop >= 2 * innerHeight) {
        settValgtLink(linker[2]);
    } 
    else if(main.scrollTop >= 1) {
        settValgtLink(linker[1]);
    } 
    else {
        settValgtLink(linker[0]);
    }

}

const slideShow = document.querySelector(".slide-show");

// Slide-show
function slide(nr) {
    slideShow.scrollTo(nr * innerWidth/2, 0);    
}