/* 질문사항
    - button js파일과 hexcode js파일을 나누어 주는게 좋을지요? 약간 장황한 것 같아서요.
    - init 함수에서 버튼 이벤트를 걸어주기 위해 handleClick 함수를 뽑아냈는데, 그러다보니 init함수 내용과 코드 중복이 발생합니다. 다른 스타일이 있을까요?
*/

const hexcodeContainer = document.querySelector(".js-hexcode"),
    hexcodeTitle = hexcodeContainer.querySelector("h1"),

    buttonContainer = document.querySelector(".js-changeBtn"),
    button = buttonContainer.querySelector("button"),

    body = document.querySelector("body");

const LT_NUMBER = 16;

// Text 와 배경을 바꾸기 위한 함수
function paintColor(randomHexCode) {
    //
    hexcodeTitle.innerText = `HEX COLOR : ${randomHexCode}`;
    body.style.backgroundColor = randomHexCode;
}

// 0 ~ F까지의 char 6개를 생성해주기 위한 함수
function genRandomHexCode() {
    //
    const letters = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    let randomHexCode = "#";
    for(let i = 0 ; i < 6 ; ++i) {
        randomHexCode += letters[Math.floor(Math.random() * LT_NUMBER)];
    }

    return randomHexCode;
}

// 버튼 이벤트를 걸어주기 위한 함수
function handleClick(event) {
    //
    const randomHexCode = genRandomHexCode();
    paintColor(randomHexCode);
}

function init() {
    //
    const randomHexCode = genRandomHexCode();
    paintColor(randomHexCode);

    button.addEventListener("click",handleClick);
}

init();