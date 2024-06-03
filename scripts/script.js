// elementen uit het DOM
const eatButton = document.querySelector("#eat");
const sleepButton = document.querySelector("#sleep");
const playButton = document.querySelector("#play");
const catImage = document.querySelector("#happyCat");
const happySound = document.querySelector("#catHappySound");
const angrySound = document.querySelector("#catAngrySound");

// array met afbeeldingen
const images = {
  angry: "img/angry.png",
  eat: "img/eat.png",
  sleep: "img/sleep.png",
  play: "img/play.png",
  happy: "img/happy.png",
};

// tijd van Laatste actie en status van acties
let laatsteActie = Date.now();
let acties = { eat: false, sleep: false, play: false };

// Functie om een geluid te stoppen en opnieuw
function stopGeluid(geluid) {
  geluid.pause();
  geluid.currentTime = 0;
}
// Functie mood van kat controleren
function checkCatMood() {
  if (acties.eat && acties.sleep && acties.play) {
    catImage.src = images.happy;
    acties = { eat: false, sleep: false, play: false };
    stopGeluid(angrySound);
    happySound.play();
    setTimeout(() => stopGeluid(happySound), 4000);
  } else {
    catImage.src = images.angry;
    stopGeluid(happySound);
    angrySound.play();
    setTimeout(() => stopGeluid(angrySound), 4000);
  }
}

function actieUitvoeren(actie) {
  acties[actie] = true;
  laatsteActie = Date.now();
  catImage.src = images[actie];
  setTimeout(checkCatMood, 1000);
}

eatButton.addEventListener("click", () => actieUitvoeren("eat"));
sleepButton.addEventListener("click", () => actieUitvoeren("sleep"));
playButton.addEventListener("click", () => actieUitvoeren("play"));

// Intervalfunctie om elke 2 seconden te controleren of de kat boos moet zijn en acties wordt gereset
setInterval(() => {
  if (Date.now() - laatsteActie > 7000) {
    catImage.src = images.angry;
    acties = { eat: false, sleep: false, play: false };
    stopGeluid(happySound);
    angrySound.play();
    setTimeout(() => stopGeluid(angrySound), 4000);
  }
}, 2000);
