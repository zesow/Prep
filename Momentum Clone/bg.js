const body = document.querySelector("body");

const IMG_NUMBER = 4;



function genRandom() {
    // Math 객체를 이용해 랜덤 숫자 가져오기 (0 ~ 3)
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");

    // body의 첫 번째 노드로 삽입한다.
    body.prepend(image);
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);    
}

init();