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
    let ans;
    switch (operator) {
        case "+":
            ans = add(a, b);
            break;
        case "-":
            ans = subtract(a, b);
            break;
        case "x":
            ans = multiply(a, b);
            break;
        case "/":
            if (b === 0) {
                disableOperators = true;
                ans = divByZeroError;
            } else ans = divide(a, b);
            break;
    }

    if (String(ans).length > 9) {
        ans = ans.toExponential(5);
    }
    return ans;
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
    if (screen.textContent.length === 9) return;
    if (num2 === '') { // case where an operator was pressed, meaning new number being entered
        if (input === '.') {
            screen.textContent = '0.';
        } else {
            screen.textContent = input;
        }
        num2 = Number(screen.textContent);
    } else { // case where appending to existing number on display
        let text = screen.textContent.trim();
        if (input === '.') {
            if (text.indexOf('.') === -1) {
                screen.textContent = text + '.';
            }
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
    if (screen.textContent === '') {
        screen.textContent = 0;
    }
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
            operator = key.textContent !== '=' ? key.textContent : operator;
        }
    });
});


window.addEventListener('keydown', (e) => {
    let btn;

    switch (e.key) {
        case '0':
            btn = document.querySelector('#zero');
            break;
        case '1':
            btn = document.querySelector('#one');
            break;
        case '2':
            btn = document.querySelector('#two');
            break;
        case '3':
            btn = document.querySelector('#three');
            break;
        case '4':
            btn = document.querySelector('#four');
            break;
        case '5':
            btn = document.querySelector('#five');
            break;
        case '6':
            btn = document.querySelector('#six');
            break;
        case '7':
            btn = document.querySelector('#seven');
            break;
        case '8':
            btn = document.querySelector('#eight');
            break;
        case '9':
            btn = document.querySelector('#nine');
            break;
        case '+':
            btn = document.querySelector('#add');
            break;
        case '-':
            btn = document.querySelector('#subtract');
            break;
        case '*':
            btn = document.querySelector('#multiply');
            break;
        case '/':
            btn = document.querySelector('#divide');
            break;
        case '=':
        case 'Enter':
            btn = document.querySelector('#equals');
            break;
        case 'Backspace':
            btn = document.querySelector('#delete');
            break;
        case 'Escape':
            btn = document.querySelector('#all-clear');
            break;
        case '.':
            btn = document.querySelector('#decimal');
            break;
    }

    if (btn) {
        btn.dispatchEvent(new MouseEvent('click'));
    }

});