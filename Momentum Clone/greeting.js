const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS,text);
}

// input에 엔터 치면 일어나는 이벤트
function handleSubmit(event) {
    // 엔터 치면 사라지는 현상 막음
    event.preventDefault(); 
    // input 폼에서 값 가져옴
    const currentValue = input.value;
    // 로컬 저장소에 저장해줌
    saveName(currentValue);
    // 이름 보여줌
    paintGreeting(currentValue);
}

// input 폼 보이게 함
function askForName() {
    // form의 display 를 none -> block 으로 변경
    form.classList.add(SHOWING_CN);
    // submit 이벤트 form 에 건다.
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
    // form의 display 를 block -> none 으로 변경
    form.classList.remove(SHOWING_CN);
    // h4의 display 를 none -> block 으로 변경
    greeting.classList.add(SHOWING_CN);
    // h4의 텍스트를 변경
    greeting.innerText = `Hello ${text}`;
}

// 시작 메소드.
function loadName() {

    // 로컬 저장소에서 가져오기
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null) {
        // non-exist
        askForName();
    } else {
        // exist
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();