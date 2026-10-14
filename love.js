/* =========================
   1. GET HTML ELEMENTS
========================= */

const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const signature = document.getElementById("signature");
const hint = document.getElementById("hint");
const hearts = document.getElementById("hearts");

/* =========================
   2. YOUR LOVE LETTER
========================= */

// You can change this message anytime.

const loveMessage = `Happy  Anniversary, my love! Ajaw panghanap lain didon bas ma broken hearted ak:<`;

const signatureText = "Pinaka gwapo na Uyab";

/* =========================
   3. TYPING ANIMATION
========================= */

let typingTimer;
let typingPosition = 0;
let animationVersion = 0;
let isOpen = false;

function typeLetter() {
    // Cancel any previous typing animation.
    clearTimeout(typingTimer);

    animationVersion++;
    const currentVersion = animationVersion;

    typingPosition = 0;
    message.textContent = "";
    message.classList.remove("finished");

    signature.textContent = "";
    signature.classList.remove("show");

    function typeNextCharacter() {
        // Stop if the letter has been closed or restarted.
        if (currentVersion !== animationVersion || !isOpen) {
            return;
        }

        if (typingPosition < loveMessage.length) {
            message.textContent += loveMessage[typingPosition];
            typingPosition++;

            // Keep the newest text visible.
            const letterContent = document.querySelector(
                ".letter"
            );

            letterContent.scrollTop = letterContent.scrollHeight;

            // Lower number = faster typing.
            typingTimer = setTimeout(
                typeNextCharacter,
                35
            );
        } else {
            // Typing is finished.
            message.classList.add("finished");

            signature.textContent = signatureText;
            signature.classList.add("show");

            hint.textContent =
                "I hope You like it! Ini ray kaya kay yay wawarts";

            restartBtn.hidden = false;
        }
    }

    typeNextCharacter();
}

/* =========================
   4. OPEN AND CLOSE LETTER
========================= */

function openLetter() {
    isOpen = true;
    envelope.classList.add("open");

    openBtn.textContent = "Close na";
    hint.textContent = "Basaha pagpaspas";

    restartBtn.hidden = true;

    typeLetter();
}

function closeLetter() {
    isOpen = false;

    // Stop the typing animation.
    animationVersion++;
    clearTimeout(typingTimer);

    envelope.classList.remove("open");

    openBtn.textContent = "Open na";
    hint.textContent =
        "Made with a little courage and a lot of love.";

    restartBtn.hidden = true;

    message.textContent = "";
    message.classList.remove("finished");

    signature.textContent = "";
    signature.classList.remove("show");
}

openBtn.addEventListener("click", () => {
    if (isOpen) {
        closeLetter();
    } else {
        openLetter();
    }
});

/* =========================
   5. READ IT AGAIN
========================= */

restartBtn.addEventListener("click", () => {
    if (isOpen) {
        typeLetter();
    }
});

/* =========================
   6. FLOATING HEARTS
========================= */

function createHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
        Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";

    const duration = 5 + Math.random() * 5;

    heart.style.animationDuration = duration + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create hearts continuously.
setInterval(createHeart, 450);