document.addEventListener("DOMContentLoaded", () => {
  const MAX_GUESSES = 6;
  const wordList = ["SILLA", "OVULO", "CIELO", "FORMA", "PARIR", "SABER"];
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  let guesses = 0;

  const button = document.getElementById("try-button");
  const wordInput = document.getElementById("word-input");
  const guessesCounter = document.getElementById("guesses-counter");
  const maxGuesses = document.getElementById("max-guesses");

  wordInput.setAttribute("maxlength", word.length);
  guessesCounter.textContent = guesses;
  maxGuesses.textContent = MAX_GUESSES;

  wordInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") button.click();
  });
  button.addEventListener("click", readInput);

  function readInput() {
    let wordInputValue = wordInput.value.toUpperCase();
    if (wordInputValue.length < word.length) {
      window.alert("La palabra debe tener " + word.length + " letras.");
      return;
    }
    let grid = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < wordInputValue.length; i++) {
      const letter = wordInputValue[i];
      const letterElement = document.createElement("div");
      let colorClass = "";
      if (letter === word[i]) {
        colorClass = "green-letter";
      } else if (word.includes(letter)) {
        colorClass = "yellow-letter";
      } else {
        colorClass = "grey-letter";
      }
      letterElement.textContent = letter;
      letterElement.className = "letter " + colorClass;
      row.appendChild(letterElement);
    }
    grid.appendChild(row);
    wordInput.value = "";
    guesses++;
    guessesCounter.textContent = guesses;
    gameEnd(wordInputValue);
  }

  function gameEnd(wordInputValue) {
    if (wordInputValue === word) {
      disableInputs();
      setTimeout(confetti, 300);
      setTimeout(() => window.alert("¡Ganaste!"), 400);
      return;
    }
    if (guesses >= MAX_GUESSES) {
      disableInputs();
      setTimeout(() => {
        let reset = window.confirm("¡Ha perdido! La palabra era " + word + ". ¿Desea reiniciar?");
        if (reset) location.reload();
      }, 100);
    }
  }

  function disableInputs() {
    document.getElementById("try-button").disabled = true;
    document.getElementById("word-input").disabled = true;
  }
});

function confetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}
