// ------- METODOS PARA VALIDAR NOMBRE -------
const nameInput = document.getElementById("nameInput");
const greetMessage = document.getElementById("greetMessage");

let typingTimer;
const TYPING_DELAY = 800;

nameInput.addEventListener("input", handleTyping);

function handleTyping() {
    // Usuario está escribiendo
    greetMessage.textContent = "Typing...";

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        greetMessage.textContent = "Waiting for input...";
    }, TYPING_DELAY);
}

function nameSend() {
    const value = nameInput.value;

    clearTimeout(typingTimer);

    if (value.trim() !== "") {
        const nameFormatted = formatName(value);
        greetMessage.textContent = `Hi! ${nameFormatted}`;
        nameInput.value = "";
    } else {
        greetMessage.textContent = "Waiting for input...";
    }
}

function formatName(name) {
    name = name.trim().toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// ------- METODOS PARA VALIDAR EDAD -------
const input = document.getElementById("ageInput");
const button = document.getElementById("checkEligibilityButton");

// Click del botón
button.addEventListener("click", validateAge);

// Cambios en el input (escribir / borrar)
input.addEventListener("input", resetIfEmpty);

function validateAge() {
    const age = Number(input.value);

    clearColors();

    if (!input.value.trim()) return;

    if (age >= 18) {
        button.textContent = "Access Granted";
        button.classList.add("bg-green-600", "hover:bg-green-700");
    } else {
        button.textContent = "Access Denied";
        button.classList.add("bg-red-600", "hover:bg-red-700");
    }
}

function resetIfEmpty() {
    if (!input.value.trim()) {
        clearColors();
        button.textContent = "Check Eligibility";
        button.classList.add("bg-[#111418]");
    }
}

function clearColors() {
    button.classList.remove(
        "bg-[#111418]",
        "bg-green-600",
        "bg-red-600",
        "hover:bg-green-700",
        "hover:bg-red-700"
    );
}

// ------- METODOS PARA CONTADOR -------
const counterValue = document.getElementById("counterValue");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const resetBtn = document.getElementById("resetBtn");

let count = 0;

// Clicks de botones
incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", resetCounter);

function increment() {
    count++;
    updateCounter();
}

function decrement() {
    count--;
    updateCounter();
}

function resetCounter() {
    count = 0;
    updateCounter();
}

function updateCounter() {
    counterValue.textContent = count;

    // Limpia colores anteriores
    counterValue.classList.remove("text-blue-500", "text-red-500");

    if (count > 0) {
        counterValue.classList.add("text-blue-500");
    } else if (count < 0) {
        counterValue.classList.add("text-red-500");
    }
}

// ------- METODOS PARA CONTADOR -------

