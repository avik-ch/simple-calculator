const divByZeroError = 'Nope';

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
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            if (b === 0) {
                disableOperators = true;
                return divByZeroError;
            }
            return divide(a, b);
    }
}

// Initial state
let repeatedOperator = true;
let disableOperators = false;

let num1 = 0, num2 = '', operator = '+';
function resetValues() {
    num1 = 0;
    num2 = '';
    operator = '+';
}


const screen = document.querySelector('.screen');
function updateDisplay(input) {
    if (num2 === '') {
        screen.textContent = input;
        num2 = Number(input);
    } else {
        let text = screen.textContent.trim();
        if (input === '.' && text.indexOf('.') === -1) {
            screen.textContent = text + '.';
        } else {
            screen.textContent = Number(text + input);
        }
    }
}


const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        if (disableOperators) {
            disableOperators = false;
            resetValues();
        }
        repeatedOperator = false;
        updateDisplay(key.textContent);
    });
});


const allClear = document.querySelector('#all-clear');
allClear.addEventListener('click', (e) => {
    resetValues();
    screen.textContent = 0;
    disableOperators = false;
});


const delBtn = document.querySelector('#delete');
delBtn.addEventListener('click', (e) => {
    screen.textContent = screen.textContent.slice(0, -1);
});


const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(key => {
    key.addEventListener('click', (e) => {
        if (!disableOperators) {
            if (!repeatedOperator) {
                num2 = Number(screen.textContent);
                num1 = operate(num1, num2, operator);
                if (num1 === divByZeroError) {
                    screen.textContent = divByZeroError;
                } else {
                    num2 = '';
                    screen.textContent = num1;
                }
                repeatedOperator = true;
            }
            operator = key.textContent;
        }
    });
});
