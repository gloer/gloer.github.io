const brett = document.getElementById("brett");
const ctx = brett.getContext("2d");

const pacman = {
    x: 200,
    y: 200,
    r: 20,
    gap: 20,
    maksgap: 45,
    mingap: 0,
    gapRetning: 1,
    rotasjon: 0,
    xRetning: 1,
    yRetning: 0,
    gapefart: 2
};

const degToRad = (deg) => {
    return Math.PI * deg / 180;
}

const tegnPacman = () => {
    ctx.clearRect(0, 0, 800, 600);

    ctx.fillStyle = "yellow";    
    ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pacman.r, degToRad(pacman.gap + pacman.rotasjon), degToRad(360-pacman.gap + pacman.rotasjon));
        ctx.lineTo(pacman.x, pacman.y);
    ctx.closePath();
    ctx.fill();
    if(pacman.gap <= 0) {
        pacman.gapRetning = pacman.gapefart * 1;
    }
    if(pacman.gap >= pacman.maksgap) {
        pacman.gapRetning = -pacman.gapefart * 1;
    }

    pacman.gap += pacman.gapRetning;
    pacman.x += pacman.xRetning;
    pacman.y += pacman.yRetning;
}

const snurr = (evt) => {
    const kode = evt.keyCode;
    switch(kode) {
        case 37: 
            pacman.rotasjon = 180;
            pacman.xRetning = -1;
            pacman.yRetning = 0;
            break;
        case 38: 
            pacman.rotasjon = 270;
            pacman.xRetning = 0;
            pacman.yRetning = -1;
            break;
        case 39:
            pacman.rotasjon = 0;
            pacman.xRetning = 1;
            pacman.yRetning = 0;
            break;
        case 40:
            pacman.rotasjon = 90;
            pacman.xRetning = 0;
            pacman.yRetning = 1;

    }
}

tegnPacman();
setInterval(tegnPacman, 10);
document.onkeydown = snurr;