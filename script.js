let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = '';

function appendNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') {
        return;
    }
    
    // Handle negative numbers
    if (op === '-' && currentInput === '') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    
    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Initialize display
updateDisplay();

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    if (e.key === 'Escape') {
        clearDisplay();
    }
});
