// Memory Pair Game Logic (Clear & Maintainable Version) негайний виклик функції
(function () {
  // ----- DOM Elements -----
  const board = document.getElementById("game-board");
  const moveCounter = document.getElementById("move-counter");
  const timerDisplay = document.getElementById("timer");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");
  const complexitySelect = document.getElementById("complexity");
  const setupControls = document.querySelector(".setup-controls");
  const gameControls = document.querySelector(".game-controls");

  if (
    !board ||
    !moveCounter ||
    !timerDisplay ||
    !restartBtn ||
    !startBtn ||
    !complexitySelect
  )
    return;

  // ----- Emoji Sets for Different Complexities -----
  const EMOJI_SETS = {
    "4x4": ["🍎", "🍌", "🍇", "🍉", "🍒", "🍋", "🍑", "🥝"], // 8 pairs
    "6x4": [
      "🍎",
      "🍌",
      "🍇",
      "🍉",
      "🍒",
      "🍋",
      "🍑",
      "🥝",
      "🍍",
      "🥥",
      "🍓",
      "🍈",
    ], // 12 pairs
    "6x6": [
      "🍎",
      "🍌",
      "🍇",
      "🍉",
      "🍒",
      "🍋",
      "🍑",
      "🥝",
      "🍍",
      "🥥",
      "🍓",
      "🍈",
      "🍏",
      "🍊",
      "🍐",
      "🍔",
      "🍕",
      "🍟",
    ], // 18 pairs
  };

  // ----- Initial Time (seconds) per Difficulty -----
  const DIFFICULTY_TIME = {
    "4x4": 180, // 3 minutes
    "6x4": 120, // 2 minutes
    "6x6": 60, // 1 minute
  };

  // ----- Game State Variables -----
  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let moves = 0;
  let timer = 0;
  let timerInterval = null;
  let gameStarted = false;
  let currentComplexity = "4x4";
  let rows = 4;
  let cols = 4;
  let timeLeft = 0;
  let gameOver = false;

  // ----- Utility Functions -----
  // Shuffle an array in place
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Set the board grid size based on complexity
  function setBoardGrid(complexity) {
    if (complexity === "4x4") {
      rows = 4;
      cols = 4;
    } else if (complexity === "6x4") {
      rows = 4;
      cols = 6;
    } else if (complexity === "6x6") {
      rows = 6;
      cols = 6;
    }
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(40px, 1fr))`;
    board.style.maxWidth = `${cols * 70}px`;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function disableAllCards() {
    cards.forEach((card) => (card.style.pointerEvents = "none"));
  }

  function enableAllCards() {
    cards.forEach((card) => (card.style.pointerEvents = ""));
  }

  // ----- Game Setup and Reset -----
  // Create and render the board for the selected complexity
  function createBoard(complexity) {
    // Reset all state
    board.innerHTML = "";
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    timer = 0;
    gameStarted = false;
    gameOver = false;
    clearInterval(timerInterval);
    moveCounter.textContent = "Moves: 0";
    timeLeft = DIFFICULTY_TIME[complexity];
    timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;
    setBoardGrid(complexity);
    enableAllCards();

    // Prepare shuffled cards (pairs)
    const emojiSet = EMOJI_SETS[complexity];
    const cardFaces = shuffle([...emojiSet, ...emojiSet]);
    cardFaces.forEach((emoji, idx) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.emoji = emoji;
      card.dataset.index = idx;
      card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${emoji}</div>
                    <div class="card-back">?</div>
                </div>
            `;
      card.addEventListener("click", () => handleCardClick(card));
      board.appendChild(card);
      cards.push(card);
    });
  }

  // ----- Game Logic -----
  // Handle a card being clicked
  function handleCardClick(card) {
    if (gameOver) return;
    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched") ||
      flippedCards.length === 2
    )
      return;
    if (!gameStarted) startTimer();
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      moves++;
      moveCounter.textContent = `Moves: ${moves}`;
      checkForMatch();
    }
  }

  // Check if the two flipped cards match
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards += 2;
      flippedCards = [];
      if (matchedCards === cards.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
          alert(
            `Congratulations! You won in ${moves} moves and ${formatTime(
              DIFFICULTY_TIME[currentComplexity] - timeLeft
            )}.`
          );
        }, 500);
        gameOver = true;
      }
    } else {
      // Not a match: flip back after a short delay
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 900);
    }
  }

  // Start the game timer
  function startTimer() {
    gameStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time: 00:00";
        disableAllCards();
        gameOver = true;
        setTimeout(() => {
          alert("Time's up! Try again.");
        }, 300);
      }
    }, 1000);
  }

  // ----- Event Handlers -----
  // Start Game button
  function startGame() {
    currentComplexity = complexitySelect.value;
    createBoard(currentComplexity);
    setupControls.style.display = "none";
    gameControls.style.display = "";
    board.style.display = "";
  }

  // Restart button
  function restartGame() {
    createBoard(currentComplexity);
    clearInterval(timerInterval);
    timerDisplay.textContent = `Time: ${formatTime(
      DIFFICULTY_TIME[currentComplexity]
    )}`;
    gameStarted = false;
    gameOver = false;
  }

  // ----- Initial Setup -----
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", restartGame);

  // On load, only show setup controls
  setupControls.style.display = "";
  gameControls.style.display = "none";
  board.style.display = "none";
})();
