let inputArray = [], operandsArray = [], operatorsArray = [], oneDecimal = false;
const display = document.querySelector('.display');
const operands = Array.from(document.querySelectorAll('.operand'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const decimal = document.getElementById('decimal');
const backspace = document.getElementById('backspace');

operands.forEach((operand) => {
  operand.addEventListener('click', function(event) {
    if (inputArray[0] == 0) inputArray.pop();
    inputArray.push(event.target.innerHTML);
    console.log(`inputArray = ${inputArray}`);
    update_display();
  })
})

operators.forEach((operator) => {
  operator.addEventListener('click', function(event) {
    operandsArray.push(inputArray.join(""));
    operatorsArray.push(event.target.innerHTML);
    inputArray.length = 0;
    oneDecimal = false;
  })
})

equals.addEventListener('click', function(event) {
  operandsArray.push(inputArray.join(""));
  console.log(`operands array = ${operandsArray}`);
  console.log(`operators array = ${operatorsArray}`);
  for (let i = 0; i < operandsArray.length - 1; i++) {
    /*if (operatorsArray[i] === '/' && operandsArray[i+1] === '0')
      display.innerHTML = 'Try again buddy';*/
    operandsArray[i+1] = operate(operatorsArray[i], parseFloat(operandsArray[i]), parseFloat(operandsArray[i+1]));
    console.log(`preliminary result of iteration ${i} = ${operandsArray[i+1]}`);
  }
  let result = parseFloat(operandsArray.pop());
  display.innerHTML = result.toFixed(2);
  
  inputArray.length = 0;
  operandsArray.length = 0;
  operatorsArray.length = 0;
  inputArray.push(result.toFixed(2));
})

clear.addEventListener('click', function(event) {
  inputArray = [];
  operandsArray = [];
  operatorsArray = [];
  oneDecimal = false;
  display.innerHTML = 0;
})

decimal.addEventListener('click', function(event) {
  inputArray.forEach((input) => {
    if (input == '.') oneDecimal = true;
  })
  if (!oneDecimal) inputArray.push(event.target.innerHTML);
})

backspace.addEventListener('click', function(event) {
  inputArray.pop();
  update_display();
})

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    console.log('b is zero');
    display.innerHTML = 'Try again buddy';
  }
  else {
    return a / b;
  }
}

function operate(operator, a, b) {
  if (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
  else    console.log("error: undefined operator");
}

function update_display() {
  if (inputArray.length == 0) {
    inputArray.push(0);
  }
  display.innerHTML = inputArray.join("");
}
