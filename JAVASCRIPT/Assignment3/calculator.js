document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", displayValue);
});


function displayValue() {
    // Get the text content of the clicked button
    const buttonText = this.textContent.trim(); 

    // Find the display element
    const display = document.querySelector(".display");

    // If the button clicked is not 'C', 'CE', or '='
    if (buttonText !== "C" && buttonText !== "CE" && buttonText !== "=" && buttonText !=="⌫") {
        // Append the clicked button's text to the display field
        display.innerText += buttonText;  
    }
if(buttonText ==="C"){
    display.innerText ="";
}
if(buttonText ==="⌫"){
   display.innerText = display.innerText.slice(0,-1); 
}


if(buttonText === "="){
    try{
        display.innerText =eval(display.innerText)
    }catch{
        display.innerText ="Error"
    }
    
   }

}   




