function add(x, y){
    return x + y
}

function substract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    return x/y
}

let result = 0;

const operate = function(operator, num1, num2){ 
    if(operator === '+'){
        result = add(num1, num2);
    } else if(operator === '-'){
        result = substract(num1, num2);
    } else if(operator === '*'){
        result = multiply(num1, num2);
    } else if(operator === '/'){
        result = divide(num1, num2);
    }
    console.log(result);
}

const display = document.getElementById('display');

const button = document.querySelector('button');

const numbers = document.querySelector('.num-btn');

const operator = document.querySelector('.operator');

button.addEventListener('click', (event) => {
    
})
