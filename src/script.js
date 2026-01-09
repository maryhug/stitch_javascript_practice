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

// ------- TASK MANAGER -------
const taskInput = document.querySelector('input[placeholder="Add a new task..."]');
const addTaskBtn = taskInput.nextElementSibling;
const taskList = document.querySelector('.logger-scroll');
const pendingBadge = document.querySelector('.text-xs.rounded-full');

let pendingTasks = 0;

// Inicializar contador
updatePendingCount();

// Click botón Add
addTaskBtn.addEventListener("click", addTask);

// Enter en input
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// Event delegation (check / delete)
taskList.addEventListener("click", handleTaskActions);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const taskItem = document.createElement("div");
    taskItem.className =
        "flex items-center justify-between p-3 rounded-lg border border-[#f0f2f4] dark:border-gray-700 bg-white dark:bg-[#101922] hover:border-primary/50 transition-colors group/item";

    taskItem.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="size-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-primary task-check"></div>
            <span class="text-sm text-[#111418] dark:text-gray-200 task-text">${taskText}</span>
        </div>
        <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity delete-task">
            <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
    `;

    taskList.prepend(taskItem);
    taskInput.value = "";

    pendingTasks++;
    updatePendingCount();
}

function handleTaskActions(e) {
    const checkBtn = e.target.closest(".task-check");
    const deleteBtn = e.target.closest(".delete-task");

    if (checkBtn) toggleTask(checkBtn);
    if (deleteBtn) deleteTask(deleteBtn);
}

function toggleTask(checkBtn) {
    const taskItem = checkBtn.closest("div.flex.items-center.justify-between");
    const taskText = taskItem.querySelector(".task-text");
    const isCompleted = checkBtn.classList.contains("bg-primary");

    if (isCompleted) {
        // Desmarcar
        checkBtn.className =
            "size-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-primary task-check";
        checkBtn.innerHTML = "";
        taskText.className = "text-sm text-[#111418] dark:text-gray-200 task-text";
        pendingTasks++;
    } else {
        // Marcar como completada
        checkBtn.classList.add("bg-primary", "border-primary");
        checkBtn.innerHTML = `<span class="material-symbols-outlined text-white text-[16px]">check</span>`;
        taskText.className = "text-sm text-gray-400 line-through task-text";
        pendingTasks--;
    }

    updatePendingCount();
}

function deleteTask(deleteBtn) {
    const taskItem = deleteBtn.closest("div.flex.items-center.justify-between");
    const isCompleted = taskItem.querySelector(".task-check").classList.contains("bg-primary");

    if (!isCompleted) pendingTasks--;

    taskItem.remove();
    updatePendingCount();
}

function updatePendingCount() {
    pendingBadge.textContent = `${pendingTasks} Pending`;
}

// ------- DARK MODE -------
const darkModeToggle = document.getElementById("darkModeToggle");
const themeLabel = document.getElementById("themeLabel");
const html = document.documentElement;

initTheme();

darkModeToggle.addEventListener("change", toggleTheme);

function toggleTheme() {
    const isDark = darkModeToggle.checked;

    html.classList.toggle("dark", isDark);
    html.classList.toggle("light", !isDark);

    updateLabel(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    const isDark = savedTheme === "dark";

    html.classList.toggle("dark", isDark);
    html.classList.toggle("light", !isDark);

    darkModeToggle.checked = isDark;
    updateLabel(isDark);
}

function updateLabel(isDark) {
    themeLabel.textContent = isDark ? "Dark Mode On" : "Dark Mode Off";
}
