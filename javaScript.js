const inputSlide = document.querySelector(".slide");
const passLength = document.querySelector(".l-value");
const result = document.querySelector(".display");
const copyBtn = document.querySelector("#copy");
const copyMsg = document.querySelector(".copy-password");
const upperCase = document.querySelector("#u-switch");
const lowerCase = document.querySelector("#l-switch");
const numbers = document.querySelector("#n-switch");
const symbols = document.querySelector("#s-switch");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const generateButton = document.querySelector(".gen-btn");
const symbol = '~`!@#$%^&*()_+=-{[}]:;"\\|<,>.?/€';

let password = "";
let passwordLength = 8;
let checkCount = 1;

handleSlider();

function handleSlider() {
    inputSlide.value = passwordLength;
    passLength.innerText = passwordLength;
    const min = inputSlide.min;
    const max = inputSlide.max;

    inputSlide.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateNumber() {
    return getRandomInteger(0,9);
}

function generateLowercase() {
    return String.fromCharCode(getRandomInteger(97,122));
}

function generateUppercase() {
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateSymbol() {
    const randomNum = getRandomInteger(0, symbol.length);
    return symbol.charAt(randomNum);
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(result.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlide.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(result.value){
        copyContent();
    }
});

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

generateButton.addEventListener('click', () => {
    if(checkCount<=0){
        return;
    }
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let Arr = [];
    if(upperCase.checked) {
        Arr.push(generateUppercase);
    }
    if(lowerCase.checked) {
        Arr.push(generateLowercase);
    }
    if(numbers.checked) {
        Arr.push(generateNumber);
    }
    if(symbols.checked) {
        Arr.push(generateSymbol);
    }

    for(let i=0; i<Arr.length; i++){
        password += Arr[i]();
    }

    for(let i=0; i<passwordLength - Arr.length; i++){
        let randomIndex = getRandomInteger(0, Arr.length);
        password += Arr[randomIndex]();
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    result.value = password;
});