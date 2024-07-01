let word = "ERROR";
const api = "https://clientes.api.greenborn.com.ar/public-random-word?l=5";

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    word = normalizeWord(data[0]).toUpperCase();
    console.log(word);
  })
  .catch((error) => console.log(error));

// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const MAX_GUESSES = 6;
  let guesses = 0;

  // Recuperar los elementos del DOM
  const refreshButton = document.getElementById("refresh-button");
  const tryButton = document.getElementById("try-button");
  const wordInput = document.getElementById("word-input");
  const guessesCounter = document.getElementById("guesses-counter");
  const maxGuesses = document.getElementById("max-guesses");

  // Actualizar algunos elementos del DOM
  wordInput.setAttribute("maxlength", word.length);
  guessesCounter.textContent = guesses;
  maxGuesses.textContent = MAX_GUESSES;

  // Darle funcionalidad al input y a los botones
  refreshButton.addEventListener("click", () => location.reload());
  wordInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") tryButton.click();
  });
  tryButton.addEventListener("click", readInput);

  // Leer la palabra ingresada por el usuario
  function readInput() {
    let wordInputValue = wordInput.value.toUpperCase();
    let grid = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";

    if (wordInputValue.length < word.length) {
      window.alert("La palabra debe tener " + word.length + " letras.");
      return;
    }

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
    checkIfGameHasEnded(wordInputValue);
  }

  function checkIfGameHasEnded(wordInputValue) {
    if (wordInputValue === word) {
      disableInputs();
      setTimeout(confetti, 200);
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
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
  });
}

function normalizeWord(word) {
  // Mapa de caracteres con tildes a sus correspondientes sin tildes
  const tildesMap = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U',
      'ñ': 'n',
      'Ñ': 'N'
  };

  // Convertir la palabra en un array de caracteres para poder mapear
  const characters = word.split('');

  // Mapear cada carácter, reemplazando los que tienen tildes
  const normalizedCharacters = characters.map(character => {
      return tildesMap[character] || character;
  });

  // Unir los caracteres normalizados en una sola cadena
  const normalizedWord = normalizedCharacters.join('');

  return normalizedWord;
}