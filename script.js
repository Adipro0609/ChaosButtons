const button = document.getElementById("chaosButton");
const countDisplay = document.getElementById("count");
const main = document.getElementById("main");
const scene = document.getElementById("scene");

let chaosLevel = 0;

const emojis = [
    "🐸", "🐸", "😂", "🔥", "💀",
    "👽", "🤖", "🦆", "🍕", "🌈",
    "💩", "🚀", "🐱", "🐶", "🦄",
    "👻", "💎", "⚡", "🍌", "🗿"
];

const scenes = [
    "radial-gradient(circle, #ff00cc, #3300ff)",
    "linear-gradient(135deg, #00ffff, #ff00ff)",
    "linear-gradient(45deg, #ff0000, #0000ff, #00ff00)",
    "radial-gradient(circle, #ff6600, #000)",
    "linear-gradient(120deg, #001f3f, #0074D9)",
    "radial-gradient(circle, #ffffff, #ff00aa)",
    "linear-gradient(135deg, #111, #ff0055, #00ffff)"
];

button.addEventListener("click", () => {

    chaosLevel++;

    countDisplay.textContent = chaosLevel;

    const events = [
        changeColors,
        spinEverything,
        spawnEmojis,
        playSound,
        explosion,
        changeScene,
        miniGame,
        doNothing
    ];

    /*
        Secret event becomes possible after
        the user has pressed the button 5 times.
    */

    if (chaosLevel >= 5 && Math.random() < 0.08) {
        secretEvent();
        return;
    }

    const randomEvent =
        events[Math.floor(Math.random() * events.length)];

    randomEvent();
});


// 🌈 RANDOM COLORS
function changeColors() {

    const color1 = randomColor();
    const color2 = randomColor();

    document.body.style.background =
        `linear-gradient(135deg, ${color1}, ${color2})`;

    button.style.background =
        `linear-gradient(135deg, ${randomColor()}, ${randomColor()})`;
}


// Generate random HEX color
function randomColor() {

    return "#" +
        Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
}


// 🌀 SPIN EVERYTHING
function spinEverything() {

    const rotations = 360 + Math.random() * 720;

    main.style.transition = "transform 1.5s ease";

    main.style.transform =
        `rotate(${rotations}deg)`;

    setTimeout(() => {

        main.style.transform = "rotate(0deg)";

    }, 1500);
}


// 🐸 SPAWN EMOJIS
function spawnEmojis() {

    const amount = 5 + Math.floor(Math.random() * 15);

    for (let i = 0; i < amount; i++) {

        const emoji =
            document.createElement("div");

        emoji.className = "emoji";

        emoji.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.left =
            Math.random() * 100 + "vw";

        emoji.style.top =
            Math.random() * 100 + "vh";

        emoji.style.setProperty(
            "--x",
            (Math.random() * 600 - 300) + "px"
        );

        emoji.style.setProperty(
            "--y",
            (Math.random() * 600 - 300) + "px"
        );

        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 2000);
    }
}


// 🔊 RANDOM SOUND
function playSound() {

    /*
        We generate the sound using the browser's
        Web Audio API, so no sound files are needed.
    */

    const audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        ["sine", "square", "sawtooth", "triangle"]
        [Math.floor(Math.random() * 4)];

    oscillator.frequency.value =
        100 + Math.random() * 1000;

    gain.gain.setValueAtTime(
        0.2,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
    );

    oscillator.connect(gain);

    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.5
    );
}


// 💥 EXPLOSION
function explosion() {

    const flash =
        document.createElement("div");

    flash.className = "flash";

    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 300);

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.style.left = "50%";
        particle.style.top = "50%";

        particle.style.background =
            randomColor();

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 500;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


// 🪐 RANDOM SCENE
function changeScene() {

    const randomScene =
        scenes[Math.floor(Math.random() * scenes.length)];

    scene.style.background =
        randomScene;

    document.body.style.background =
        "#000";
}


// 🎲 MINI GAME
function miniGame() {

    const game =
        document.createElement("div");

    game.className = "miniGame";

    game.innerHTML = `
        <div class="gameBox">
            <h2>🎯 CATCH THE TARGET</h2>
            <p>Click it 5 times before it escapes!</p>
            <p>
                Score:
                <span id="score">0</span>
            </p>

            <button id="closeGame">
                Give Up
            </button>
        </div>
    `;

    document.body.appendChild(game);

    let score = 0;

    const target =
        document.createElement("button");

    target.id = "target";

    target.textContent = "🎯";

    document.body.appendChild(target);

    function moveTarget() {

        target.style.left =
            Math.random() * 85 + "vw";

        target.style.top =
            Math.random() * 80 + "vh";
    }

    moveTarget();

    target.addEventListener("click", () => {

        score++;

        document.getElementById("score")
            .textContent = score;

        moveTarget();

        if (score >= 5) {

            target.remove();
            game.remove();

            alert("YOU BEAT THE CHAOS! 🏆");
        }
    });

    document.getElementById("closeGame")
        .addEventListener("click", () => {

            target.remove();
            game.remove();
        });
}


// 👾 NOTHING HAPPENS
function doNothing() {

    // Absolutely nothing.

    console.log(
        "The Chaos Button has decided to do nothing."
    );
}


// 🕵️ SECRET EVENT
function secretEvent() {

    const secret =
        document.createElement("div");

    secret.className = "secret";

    secret.innerHTML = `
        <div>
            <div>⚠️ SECRET EVENT ⚠️</div>
            <br>
            <small>
                YOU FOUND THE CHAOS ROOM
            </small>
        </div>
    `;

    document.body.appendChild(secret);

    playSound();

    setTimeout(() => {

        secret.remove();

    }, 3500);
}


// Easter egg:
// Press the keyboard "C" key.
document.addEventListener("keydown", (event) => {

    if (event.key.toLowerCase() === "c") {

        explosion();
        spawnEmojis();
        changeColors();

    }
});
