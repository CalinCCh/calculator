let inputValue = document.querySelector(".input");

const buttons = document.querySelectorAll("button");

let num1, num2, operator;

let isNum2 = false; //False -> num1 | True -> num2

let numEntered = false; //Prevents from doing another operation until another number is entered

let operatorActive = false;
let numberAtive = false;

function setDefault() {
  inputValue.textContent = "0";
  num1 = 0;
  num2 = null;
  operator = null;
  isNum2 = false;
  operatorActive = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.textContent) {
      case "AC":
        setDefault();
        return;
      case "+":
      case "-":
      case "*":
      case "/":
        if (!isNum2) {
          isNum2 = true;
        } else {
          isNum2 = false;
          if (numEntered) {
            inputValue.textContent = operate(num1, num2, operator);
            num1 = inputValue.textContent;
            numEntered = false;
          }
        }
        operatorActive = true;
        operator = button.textContent;

        return;
      case "=":
        if (num1 !== null && num2 !== null && operator !== null) {
          inputValue.textContent = operate(num1, num2, operator);
          num1 = inputValue.textContent;
          isNum2 = false;
          operatorActive = false;
        }
        return;
      case "DEL":
        if (inputValue.textContent.length === 1) {
          inputValue.textContent = "0";
        } else {
          inputValue.textContent = inputValue.textContent.slice(0, -1);
        }
        return;
      case "+/-":
        if (inputValue.textContent !== "0")
          if (inputValue.textContent.slice(0, 1) === "-") {
            inputValue.textContent = inputValue.textContent.substring(1);
          } else {
            inputValue.textContent = "-" + inputValue.textContent;
          }
        return;
      case ".":
        if (!inputValue.textContent.includes(".")) {
          inputValue.textContent += button.textContent;
        }
        return;
      case "%":
        inputValue.textContent = Number (inputValue.textContent) / 100;
        return;
      default:
        numEntered = true;

        if (inputValue.textContent === "0") {
          inputValue.textContent = button.textContent;
        } else if (operatorActive) {
          inputValue.textContent = button.textContent;
          operatorActive = false;
        } else {
          inputValue.textContent += button.textContent;
        }

        if (!isNum2) {
          num1 = inputValue.textContent;
        } else {
          num2 = inputValue.textContent;
        }
        return;
    }
  });
});

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) return "manin🤘";
      return num1 / num2;
    default:
      return "Invalid operator";
  }
}

setDefault();
