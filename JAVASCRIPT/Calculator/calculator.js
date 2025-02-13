document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", displayValue);
});

function displayValue() {
    const buttonText = this.textContent.trim();
    const display = document.querySelector(".display");

    // Handle Clear (C) - Clears the entire display
    if (buttonText === "C") {
        display.innerText = "";
        return;
    }

    // Handle Backspace (⌫) - Deletes the last character
    if (buttonText === "⌫") {
        display.innerText = display.innerText.slice(0, -1);
        return;
    }

    // Handle Equal (=) - Evaluates the expression
    if (buttonText === "=") {
        try {
            display.innerText = eval(display.innerText);
        } catch {
            display.innerText = "Error"; // Handle invalid expressions
        }
        return;
    }

    // Handle Square Root (√x)
    if (buttonText === "√x") {
        try {
            
            display.innerText = Math.sqrt(eval(display.innerText));
        } catch {
            display.innerText = "Error"; 
        }
        return;
    }

    // Handle Square (x²)
    if (buttonText === "x²") {
        try {
            display.innerText =
            display.innerText = Math.pow(eval(display.innerText), 2);
        } catch {
            display.innerText = "Error"; 
        }
        return;
    }

    // Append numbers & operators to display
    display.innerText += buttonText;
}
