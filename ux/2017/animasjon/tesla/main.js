const bilen = document.getElementById("bil");
const bakhjul = document.getElementById("bakhjul");
const forhjul = document.getElementById("forhjul");
const btnFaster = document.getElementById("btnFaster");
const btnSnu = document.getElementById("btnSnu");
const slider = document.getElementById("slider");

const keyframesDrive = [
    { left: "-400px", easing: "ease-in-out" },
    { left: "200px", easing: "linear" },
    { left: "200px", easing: "ease-in" },
    { left: "900px" }
];

const keyframesRotate = [
    { transform: "rotate(0)", easing: "ease-in-out" },
    { transform: "rotate(3turn)", easing: "linear" },
    { transform: "rotate(3turn)", easing: "ease-in" },
    { transform: "rotate(6turn)" }
];

const settings = {
    duration: 8000,
    iterations: Infinity,
    fill: "forwards"    
};

const drive = bilen.animate(keyframesDrive, settings);
const snurrBakhjul = bakhjul.animate(keyframesRotate, settings);
const snurrForhjul = forhjul.animate(keyframesRotate, settings);

snurrBakhjul.currentTime = 32000;
snurrForhjul.currentTime = 32000;
drive.currentTime = 32000;

// functions


// Button events
btnFaster.onclick = () => {
    drive.playbackRate += 2;
    snurrBakhjul.playbackRate += 2;
    snurrForhjul.playbackRate += 2;
}

btnSnu.onclick = () => {
    drive.reverse();
    snurrBakhjul.reverse();
    snurrForhjul.reverse();
}

slider.oninput = () => {

    drive.currentTime = slider.value;
    snurrBakhjul.currentTime = slider.value;
    snurrForhjul.currentTime = slider.value;

}

setInterval(
    () => { 
        slider.value = drive.currentTime % 8000; 
    }
, 10);