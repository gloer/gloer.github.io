// Referanser til HTML-elementer
const video = document.getElementById("video");
const btnAper = document.getElementById("btnAper");

/*

    @keyframes fadeUtOgInn {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    #video {
        animation: fadeUtOgInn 0.5s;
    }

*/

function hoppTilApene() {

    const keyframes = [
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 }
    ];

    const settings = {
        duration: 500
    };

    video.animate(keyframes, settings);
    video.currentTime = 40;
}

btnAper.onmouseenter = hoppTilApene;

let reklameErVist = false;

function visReklame() {
    if (video.currentTime > 5 && !reklameErVist) {
        console.log("Tid for reklame");
        reklameErVist = true;
    }
}

video.ontimeupdate = visReklame;