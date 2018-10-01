const alice = document.getElementById("alice");

const alice_keyframes = [
    { transform: "rotate(0) translate(-50%, -50%)" },
    { transform: "rotate(360deg) translate(-50%, -50%)" }
];

const alice_settings = {
    duration: 3000,
    iterations: Infinity
};

const  tunnel_keyframes = [
    { transform: "translateY(0)" },
    { transform: "translateY(-300px)" }
];

const tunnel_settings = {
    duration: 1000,
    iterations: Infinity
};


const alice_animation = alice.animate(alice_keyframes, alice_settings);
const tunnel_animation = tunnel.animate(tunnel_keyframes, tunnel_settings);

alice_animation.currentTime = 3000 * 100;
tunnel_animation.currentTime = 3000 * 100;

let speed = 1;

document.onclick = () => {
    speed--;
    alice_animation.playbackRate = speed;
    tunnel_animation.playbackRate = speed;
}