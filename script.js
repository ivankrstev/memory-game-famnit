const shuffleCards = () => {
  const game = document.querySelector(".game");
  for (let i = 0; i < cards.length; i++) {
    game.appendChild(cards[Math.floor(Math.random() * 18)]);
  }
};

shuffleCards();

let time = 0;
let intervalId = 0;
const countTime = () => {
  time = 1;
  intervalId = setInterval(() => {
    document.getElementById("timer").innerText =
      "Timer: " + parseInt(time / 60) + ":" + (time % 60);
    if (parseInt(time / 60) < 10 && time % 60 < 10)
      document.getElementById("timer").innerText =
        "Timer: 0" + parseInt(time / 60) + ":0" + (time % 60);
    else if (parseInt(time / 60) >= 10 && time % 60 < 10)
      document.getElementById("timer").innerText =
        "Timer: " + parseInt(time / 60) + ":0" + (time % 60);
    else if (parseInt(time / 60) < 10 && time % 60 >= 10)
      document.getElementById("timer").innerText =
        "Timer: 0" + parseInt(time / 60) + ":" + (time % 60);
    else
      document.getElementById("timer").innerText =
        "Timer: " + parseInt(time / 60) + ":" + (time % 60);
    time++;
  }, 1000);
};

const cards = document.querySelectorAll(".game button");
cards.forEach((e) => {
  e.addEventListener("click", () => {
    if (time === 0) countTime();
    if (e.classList.contains("flipped")) e.classList.remove("flipped");
    else e.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    if (flippedCards.length === 2) {
      if (
        flippedCards[0].childNodes[3].src === flippedCards[1].childNodes[3].src
      ) {
        flippedCards[0].setAttribute("disabled", "disabled");
        flippedCards[1].setAttribute("disabled", "disabled");
        flippedCards[0].classList.add("match");
        flippedCards[1].classList.add("match");
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
      } else {
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
        }, 500);
      }
    }
    if (flippedCards.length > 2) {
      flippedCards.forEach((card) => {
        if (!card.classList.contains("match")) card.classList.remove("flipped");
      });
    }
    const matchedCards = document.querySelectorAll(".match");
    if (matchedCards.length === 18) {
      clearInterval(intervalId);
      time = 0;
      setTimeout(() => alert("Game Finished!"), 200);
    }
  });
});

document.querySelector("#reset-game").addEventListener("click", () => {
  cards.forEach((e) => {
    e.className = "card";
    e.removeAttribute("disabled");
  });
  clearInterval(intervalId);
  time = 0;
  document.getElementById("timer").innerText = "Timer: 00:00";
  setTimeout(() => shuffleCards(), 300);
});
