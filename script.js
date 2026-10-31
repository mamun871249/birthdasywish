
/* ==========================================
   BEST FRIEND VIRUS DETECTED 🎂
   Personalize your birthday surprise here!
========================================== */

const CONFIG = {
  herName: "Bestie",
  yourName: "Your Best Friend",

  roasts: [
    "🚨 ALERT: Drama level 999%! NASA is trying to understand your mood swings.",
    "🧠 Your brain is still loading... Please wait until next birthday.",
    "👑 Attitude: Queen. Bank balance: Let's not talk about it. 😂",
    "📱 Replying to messages? 2 business days. Asking for gossip? 0.2 seconds.",
    "🤡 You are not getting older. You are becoming a limited-edition headache!",
    "⚠️ Warning: This person can turn a tiny problem into a 3-season Netflix series.",
    "🎭 Your talent? Saying 'I'm fine' with 27 different emotions.",
    "💅 10% innocent, 90% drama, 100% my favourite troublemaker.",
    "📶 Your Wi-Fi has a better connection than your common sense.",
    "🎂 Congratulations! You unlocked a new age but the brain update failed."
  ],

  questions: [
    {
      question: "Who is more dramatic in this friendship? 🎭",
      options: [
        "Obviously me 😎",
        "My best friend 🙄",
        "Both of us need therapy 😂"
      ],
      answer: 2,
      feedback: "Correct! Two clowns, one friendship circus. 🎪"
    },
    {
      question: "What is our friendship made of? 💗",
      options: [
        "Love and trust 🫶",
        "Gossip and nonsense 😂",
        "Food, memes and unlimited roasting 🍟"
      ],
      answer: 0,
      feedback: "All three! That's the secret formula of our friendship. 💖"
    },
    {
      question: "What is your birthday gift from me? 🎁",
      options: [
        "A private jet ✈️",
        "A million dollars 💸",
        "My priceless friendship 😂💗"
      ],
      answer: 2,
      feedback: "Yes! No refunds, no exchanges, lifetime subscription! 🤣"
    }
  ],

  birthdayMessage:
    "Happy Birthday! You are annoying, chaotic, and absolutely irreplaceable. 💗"
};

/* Utility functions */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let soundEnabled = false;
let audioContext = null;
let quizIndex = 0;
let answered = false;
let giftAttempts = 0;
let cakeBlown = false;
let scanStarted = false;

/* Apply the friend's name */
function personalize() {
  $("#friendHeading").textContent = CONFIG.herName;
  $("#finalName").textContent = CONFIG.herName + "!";
  document.title = `Happy Birthday ${CONFIG.herName}! 🎂`;
}

/* Screen navigation */
function showScreen(id) {
  $$(".screen").forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "roast") {
    showRandomRoast();
  }

  if (id === "quiz") {
    renderQuestion();
  }

  if (id === "final") {
    launchConfetti(100);
  }
}

$$("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
    playTone(660, 0.09);
  });
});

/* Tiny sound effects using browser audio */
function playTone(frequency = 500, duration = 0.12) {
  if (!soundEnabled) return;

  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    audioContext ||= new AudioContextClass();

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.07, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.warn("Audio is unavailable in this browser.");
  }
}

$("#muteBtn").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  $("#muteBtn").textContent =
    soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";

  if (soundEnabled) {
    playTone(700, 0.12);
  }
});

/* Fake hacking scan — just a visual animation */
$("#scanBtn").addEventListener("click", () => {
  if (scanStarted) return;

  scanStarted = true;
  const button = $("#scanBtn");
  const progress = $("#progressFill");
  const label = $("#progressLabel");
  const terminal = $("#terminalText");

  button.disabled = true;
  button.textContent = "SCANNING... 🔍";

  const steps = [
    "Connecting to the drama department...",
    "Checking attitude levels...",
    "Searching for common sense...",
    "Detecting birthday cuteness...",
    "Downloading 999% drama...",
    "FINAL RESULT: EXTREMELY SPECIAL HUMAN!"
  ];

  let value = 0;
  let step = 0;

  const scanTimer = setInterval(() => {
    value = Math.min(100, value + 2);
    progress.style.width = value + "%";
    label.textContent = `System scanning: ${value}%`;

    const expectedStep = Math.min(
      steps.length - 1,
      Math.floor(value / 18)
    );

    if (expectedStep !== step) {
      step = expectedStep;
      terminal.textContent = steps[step];
      playTone(320 + step * 75, 0.07);
    }

    if (value >= 100) {
      clearInterval(scanTimer);

      terminal.textContent = "JUST KIDDING! HAPPY BIRTHDAY! 😂🎂";
      button.disabled = false;
      button.textContent = "OPEN YOUR ROAST REPORT 😂";

      button.onclick = () => {
        showScreen("roast");
        button.onclick = null;
      };
    }
  }, 65);
});

/* Random roast messages */
function showRandomRoast() {
  const randomIndex = Math.floor(Math.random() * CONFIG.roasts.length);
  $("#roastText").textContent = CONFIG.roasts[randomIndex];
  playTone(450, 0.08);
}

$("#anotherRoast").addEventListener("click", () => {
  showRandomRoast();
  launchConfetti(12);
});

/* Friendship quiz */
function renderQuestion() {
  const question = CONFIG.questions[quizIndex];

  if (!question) {
    $("#questionCount").textContent = "EXAM COMPLETE 🏆";
    $("#questionText").textContent =
      "You passed the friendship exam! Barely. 😂";
    $("#answerOptions").innerHTML = "";
    $("#quizFeedback").textContent =
      "Official result: Bestie for life. No cancellation allowed! 💗";

    $("#nextQuestion").textContent = "CLAIM YOUR GIFT 🎁";
    $("#nextQuestion").classList.remove("hidden");
    $("#nextQuestion").onclick = () => {
      $("#nextQuestion").onclick = null;
      showScreen("gift");
    };
    return;
  }

  answered = false;
  $("#questionCount").textContent =
    `Question ${quizIndex + 1} of ${CONFIG.questions.length}`;
  $("#questionText").textContent = question.question;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").classList.add("hidden");
  $("#nextQuestion").textContent = "NEXT QUESTION ➡️";
  $("#nextQuestion").onclick = nextQuestion;

  const optionsContainer = $("#answerOptions");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;

      answered = true;

      const allOptions = $$(".answer-option");
      allOptions.forEach(item => item.disabled = true);

      button.classList.add(
        index === question.answer ? "correct" : "wrong"
      );

      $("#quizFeedback").textContent =
        index === question.answer
          ? question.feedback
          : "WRONG ANSWER! 😂 But don't worry, your bestie still loves you.";

      playTone(index === question.answer ? 700 : 230, 0.15);
      $("#nextQuestion").classList.remove("hidden");
    });

    optionsContainer.appendChild(button);
  });
}

function nextQuestion() {
  quizIndex++;
  renderQuestion();
  playTone(560, 0.08);
}

/* Mischievous gift box */
const giftBox = $("#giftBox");

giftBox.addEventListener("click", () => {
  giftAttempts++;

  const messages = [
    "HAHA! You missed! The gift has trust issues. 😂",
    "Access denied! Try using your birthday powers. 🥷",
    "Error 404: Gift not found. Your patience not found either. 🤣",
    "The gift says: First promise to stop being dramatic! 😭",
    "Okay, you win. This gift is more stubborn than you. 🎁"
  ];

  $("#giftCounter").textContent = `Attempts: ${giftAttempts}`;
  $("#giftMessage").textContent =
    messages[Math.min(giftAttempts - 1, messages.length - 1)];

  giftBox.classList.remove("escaped");
  void giftBox.offsetWidth;
  giftBox.classList.add("escaped");

  playTone(300 + giftAttempts * 35, 0.1);

  if (giftAttempts >= 3) {
    $("#giftMessage").textContent =
      "Fine! You're too stubborn. Press the button below for the real surprise! 😂💗";
  }
});

$("#revealGift").addEventListener("click", () => {
  $("#giftReveal").classList.remove("hidden");
  $("#giftBox").classList.add("hidden");
  $("#giftMessage").classList.add("hidden");
  $("#giftCounter").classList.add("hidden");
  $("#revealGift").classList.add("hidden");

  launchConfetti(65);
  playTone(800, 0.2);
});

/* Cake candle interaction */
$("#cakeArt").addEventListener("click", blowCandles);

function blowCandles() {
  if (cakeBlown) return;

  cakeBlown = true;
  $("#cakeArt").classList.add("blown");
  $("#cakeMessage").textContent =
    "WISH GRANTED! 🎉 May your happiness be unlimited and your problems be on airplane mode. 💗";

  launchConfetti(55);
  playTone(850, 0.2);
}

$("#celebrateBtn").addEventListener("click", () => {
  blowCandles();
  launchConfetti(120);

  $("#cakeMessage").textContent =
    "PARTY MODE ACTIVATED! 💃 Dance like nobody is watching! 🥳";

  playTone(900, 0.2);
});

/* Confetti celebration */
function launchConfetti(amount = 50) {
  const container = $("#confetti");
  const colors = ["#ff63b5", "#a88aff", "#ffd76a", "#71ffc4", "#ffffff"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = Math.random() > 0.65 ? "♥" : "●";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = (8 + Math.random() * 13) + "px";
    piece.style.setProperty("--duration", (2 + Math.random() * 3) + "s");
    piece.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");

    container.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
  }
}

/* Replay from the beginning */
$("#finalParty").addEventListener("click", () => {
  quizIndex = 0;
  answered = false;
  giftAttempts = 0;
  cakeBlown = false;
  scanStarted = false;

  $("#progressFill").style.width = "0%";
  $("#progressLabel").textContent = "System starting: 0%";
  $("#terminalText").textContent = "Initializing friendship scan...";

  $("#scanBtn").disabled = false;
  $("#scanBtn").textContent = "SCAN THE DRAMA QUEEN 🚨";
  $("#scanBtn").onclick = null;

  $("#giftBox").classList.remove("hidden");
  $("#giftMessage").classList.remove("hidden");
  $("#giftCounter").classList.remove("hidden");
  $("#revealGift").classList.remove("hidden");
  $("#giftReveal").classList.add("hidden");

  $("#giftMessage").textContent = "Your gift is shy. Tap it to open!";
  $("#giftCounter").textContent = "Attempts: 0";

  $("#cakeArt").classList.remove("blown");
  $("#cakeMessage").textContent =
    "Warning: birthday calories don't count today!";

  showScreen("intro");
});

personalize();
