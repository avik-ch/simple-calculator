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
        case "*":
            return multiply(a, b);
        case "/":
            if (b === 0) {
                return "Division by 0 error";
            }
            return divide(a, b);
    }
}

// Initial state
let num1 = 0, num2 = 0, operator = '+';


