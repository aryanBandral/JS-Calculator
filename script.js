const screen = document.querySelector('.screen')
const clearBtn = document.getElementById('clear-btn')
const signBtn = document.getElementById('sign-btn')
const percentageBtn = document.getElementById('percentage-btn')
const equalsBtn = document.getElementById('equal-btn')
const dotBtn = document.getElementById('dot-btn')
const operatorButtons = document.querySelectorAll('.sign')
const numberButtons = document.querySelectorAll('.number')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

clearBtn.addEventListener('click', clear)
dotBtn.addEventListener('click', appendDecimal)
equalsBtn.addEventListener('click', evaluate)
percentageBtn.addEventListener('click', percentage)
signBtn.addEventListener('click', toggleSign)

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent))
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

function appendNumber (number) {
    if (screen.textContent === '0' || shouldResetScreen) {
        resetScreen()
    }
    screen.textContent += number
}

function appendDecimal () {
    if (screen.textContent.includes('.')) {
        return
    }
    screen.textContent += '.'
}

function resetScreen () {
    screen.textContent = ''
    shouldResetScreen = false
}

function clear () {
    screen.textContent = '0'
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = screen.textContent
    currentOperation = operator
    screen.textContent = `${firstOperand}`
    shouldResetScreen = true
}

function evaluate () {
    if (currentOperation === null) return
    if (currentOperation === '÷' && screen.textContent === '0') {
    alert("You can't divide by 0!")
    return
    }
    secondOperand = screen.textContent
    screen.textContent = roundResult(operate(firstOperand, secondOperand, currentOperation))
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function toggleSign () {
    if (parseFloat(screen.textContent) > 0) {
        screen.textContent = parseFloat(screen.textContent) * -1;
        screen.textContent = screen.textContent.toString();
    } else if (screen.textContent.includes("-")) {
        screen.textContent = screen.textContent.substring(1);
    }
}

function percentage () {
    screen.textContent = (screen.textContent / 100)
}

function operate (a, b, operator) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}