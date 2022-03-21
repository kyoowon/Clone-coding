const images = ["0.png", "1.jpeg", "2.jpeg"]

const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");
// bgImage.id = "bg";
// bgImage.src = `img/${chosenImage}`;

document.body.style.backgroundImage = `url("img/${chosenImage}")`;

// document.body.appendChild(bgImage);