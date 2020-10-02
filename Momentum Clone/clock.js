const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    // 시분초를 가져온다.
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // 3항연산자 - 숫자가 1자리 수일경우 앞에 0을 붙여준다.
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function init() {
    getTime();
    // 1000 ms(1초) 마다 getTime 함수가 실행되게 설정해줌(=interval 을 걸어줌)
    setInterval(getTime,1000);
}

init();