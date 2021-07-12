const display = document.querySelector("span");
const buttons = document.querySelectorAll("button");
const clear = document.querySelector("#clear_button");

//Variables
let firstValue = 0;
let operatorValue = "";
let nextInQueue = false;
const calculation = {
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

//Function
function displayItem(item) {
  if (nextInQueue) {
    display.textContent = item;
    nextInQueue = false;
  } else {
    const displayValue = display.textContent;
    display.innerText = displayValue == 0 ? item : displayValue + item;
  }
}

function useOperator(operator) {
  const currentValue = Number(display.textContent);
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculate = calculation[operatorValue](firstValue, currentValue);
    display.textContent = calculate;
    firstValue = calculate;
  }
  nextInQueue = true;
  operatorValue = operator;
}

function addDecimel() {
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
}

function reset() {
  display.innerText = "0";
}

function backSpace() {
  let displayValue = display.textContent;
  if (displayValue.length > 1) {
    let back = displayValue.slice(0, -1);
    display.innerText = back;
  }
}

//Event Listeners
buttons.forEach((inputBtn) => {
  if (inputBtn.classList.length == 0) {
    inputBtn.addEventListener("click", () => displayItem(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => displayItem(inputBtn.value));
  } else if (inputBtn.classList.contains("back")) {
    inputBtn.addEventListener("click", () => backSpace());
  }
});

clear.addEventListener("click", () => reset());
