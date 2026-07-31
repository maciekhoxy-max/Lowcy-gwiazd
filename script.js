const TOTAL_IMAGES = 20;
const MAX_LIVES = 5;
const COOLDOWN = 15; // sekundy

let images = [];
let current = 0;
let lives = MAX_LIVES;

const image = document.getElementById("image");
const counter = document.getElementById("counter");
const nextButton = document.getElementById("nextButton");
const livesDiv = document.getElementById("lives");
const cooldownDiv = document.getElementById("cooldown");

// Tworzenie listy obrazów
for (let i = 1; i <= TOTAL_IMAGES; i++) {
    images.push(i + ".png");
}

shuffle(images);

showImage(true);
updateLives();
checkCooldown();

nextButton.addEventListener("click", () => {

    if (nextButton.disabled) return;

    // Następny obraz
    current++;

    if (current >= images.length) {
        shuffle(images);
        current = 0;
    }

    showImage();

    // Odejmujemy życie dopiero po pokazaniu obrazka
    lives--;
    updateLives();

    if (lives <= 0) {
        startCooldown();
    }

});

function showImage(firstLoad = false) {

    if (firstLoad) {

        image.src = "images/" + images[current];
        counter.innerHTML = (current + 1) + " / " + images.length;
        return;

    }

    image.classList.add("flip");

    setTimeout(() => {

        image.src = "images/" + images[current];
        counter.innerHTML = (current + 1) + " / " + images.length;

        setTimeout(() => {
            image.classList.remove("flip");
        }, 50);

    }, 150);

}

function updateLives() {

    let txt = "";

    for (let i = 0; i < MAX_LIVES; i++) {
        txt += (i < lives) ? "⭐" : "☆";
    }

    livesDiv.innerHTML = txt;

}

function startCooldown() {

    nextButton.disabled = true;
    nextButton.innerHTML = "⏳ Poczekaj...";

    const end = Date.now() + COOLDOWN * 1000;

    localStorage.setItem("cooldownEnd", end);

    runCountdown(end);

}

function checkCooldown() {

    const end = localStorage.getItem("cooldownEnd");

    if (!end) return;

    if (Date.now() >= Number(end)) {

        localStorage.removeItem("cooldownEnd");
        return;

    }

    nextButton.disabled = true;
    nextButton.innerHTML = "⏳ Poczekaj...";

    runCountdown(Number(end));

}

function runCountdown(end) {

    cooldownDiv.innerHTML =
        "Nowa pula za: " + Math.ceil((end - Date.now()) / 1000) + " s";

    const interval = setInterval(() => {

        const left = Math.ceil((end - Date.now()) / 1000);

        if (left <= 0) {

            clearInterval(interval);

            lives = MAX_LIVES;
            updateLives();

            nextButton.disabled = false;
            nextButton.innerHTML = "Następne";

            localStorage.removeItem("cooldownEnd");

            cooldownDiv.innerHTML = "✅ Odblokowano!";

            setTimeout(() => {
                cooldownDiv.innerHTML = "";
            }, 1500);

            return;

        }

        cooldownDiv.innerHTML =
            "Nowa pula za: " + left + " s";

    }, 1000);

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}
