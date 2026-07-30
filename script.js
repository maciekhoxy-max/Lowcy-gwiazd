const TOTAL_IMAGES = 20;

let images = [];
let current = 0;

for (let i = 1; i <= TOTAL_IMAGES; i++) {
    images.push(i + ".png");
}

shuffle(images);

showImage();

document.getElementById("nextButton").addEventListener("click", () => {

    current++;

    if (current >= images.length) {

        if (confirm("Wyświetlono wszystkie grafiki.\nRozpocząć od nowa?")) {

            shuffle(images);
            current = 0;
            showImage();

        }

        return;
    }

    showImage();

});

function showImage() {

    const img = document.getElementById("image");

    img.classList.add("flip");

    setTimeout(() => {

        img.src = "images/" + images[current];

        document.getElementById("counter").innerHTML =
            (current + 1) + " / " + images.length;

    }, 175);

    setTimeout(() => {

        img.classList.remove("flip");

    }, 350);

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}
