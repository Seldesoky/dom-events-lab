/*-------------------------- Constants ----------------------------*/

// There are no Constants defined in the MVP//

/*-------------------------- Cached Element References ---------------------*/

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
let clearButton = null;

operatorButtons.forEach(button => {
    if (button.textContent.trim() === 'C') {
        clearButton = button;
    }
});

/*--------------------------- Variables -----------------------------*/

let firstOperand = null;
let currentOperator = null;
let resetDisplay = false;

/*--------------------------- Event Listeners -------------------------*/

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleNumber(button.textContent);
  });
});

operatorButtons.forEach(button => {
  if (button.textContent !== 'C') { 
    button.addEventListener('click', () => {
      handleOperator(button.textContent);
    });
  }
});

if (clearButton) {
  clearButton.addEventListener('click', clearDisplay);
}

equalsButton.addEventListener('click', performCalculation);

/*----------------------------- Functions -----------------------------*/

function handleNumber(number) {
  if (resetDisplay || display.textContent === '0') {
    display.textContent = number;
    resetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function handleOperator(operator) {
  if (!firstOperand && display.textContent !== '0') {
    firstOperand = parseFloat(display.textContent); 
    resetDisplay = true; 
  }
  currentOperator = operator; 
}

function performCalculation() {
  if (firstOperand !== null && currentOperator && !resetDisplay) {
    const secondOperand = parseFloat(display.textContent);
    display.textContent = operate(firstOperand, secondOperand, currentOperator);
    firstOperand = null; 
    currentOperator = null;
    resetDisplay = true;
  }
}

function operate(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error'; 
    default: return 0; 
  }
}

function clearDisplay() {
  display.textContent = '0'; 
  firstOperand = null;
  currentOperator = null;
  resetDisplay = false;
}
