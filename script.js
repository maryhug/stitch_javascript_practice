function nameSend() {
    const input = document.getElementById("nameInput");
    const message = document.getElementById("greetMessage");

    if (input.value.trim() !== "") {

        const nameFormatted = formatName(input.value)

        message.textContent = `Hi! ${nameFormatted}`;
        input.value = "";
    } else {
        message.textContent = "Waiting for input...";
    }
}

function ageSend(){
    const input = document.getElementById("ageInput")
    const message = document.getElementById("checkEligibilityButton")
    const messageOlder = document.getElementById("accessMessage")

    const age = Number(input.value)

    if (!input.value.trim()) {
        message.classList.remove("hidden");
        return;
    }

    if (age >= 18) {
        message.textContent = "Access Granted";
        message.classList.remove("hidden");
   } else {
        message.textContent = "Access Denied";
        message.classList.remove("hidden");
    }
}

function formatName(name) {
    name = name.trim().toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
}





