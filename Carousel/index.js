const leftArrow = document.querySelector(".left-arrow"),
    rightArrow = document.querySelector(".right-arrow"),
    imageBox = document.getElementById("imageBox");

const IMG_TOTAL = 5;

// 표시해 줘야 할 이미지 번호를 저장한 전역변수.
// Q1. 전역변수를 함부로(?) 되는지 마음에 걸립니다.
let imgNumber = 1;

// 누른 화살표 방향에 따라서 이미지 번호를 바꿔주는 함수. 
// 나중에 dot의 색을 바꿀 때 이전 번호와 이번 번호가 둘 다 필요하므로 이 둘을 담은 배열을 반환합니다.
// Q2. 전역변수를 쓰고 있음에도 그 숫자들을 담은 배열을 또 반환한다는 게 지저분한 느낌이 드는데, 바꿔야 할지요?
function changeImgNumber(dir) {

    let imgNumberArr = [];

    imgNumberArr.push(imgNumber);

    // 좌측 화살표 클릭시 이전 이미지 보여주기, 우측 화살표 클릭시 다음 이미지 보여주기
    dir === "left" ? imgNumber-- : imgNumber++;
    // 1번째 이미지에서 좌측 화살표를 누를 경우, 5번째 이미지 보여주기
    if(imgNumber < 1) imgNumber = IMG_TOTAL;
    // 5번째 이미지에서 우측 화살표를 누를 경우, 1번째 이미지 보여주기
    if(imgNumber > IMG_TOTAL) imgNumber = 1;

    imgNumberArr.push(imgNumber);

    return imgNumberArr;
}

// [이전 이미지 번호, 이번 이미지 번호] 를 가진 배열 imgNumberArr 를 파라미터로 받아 이전 점은 회색으로, 이번 점은 검정으로 만들어 주는 함수.
function paintDot(imgNumberArr) {
    const beforeDot = document.getElementById(`dot${imgNumberArr[0]}`);
    const nowDot = document.getElementById(`dot${imgNumberArr[1]}`);

    beforeDot.classList.remove("selectedDot");
    nowDot.classList.add("selectedDot");
}

// 이미지를 바꿔주는 함수
function paintImage() {

    imageBox.src = `./images/${imgNumber}.jpg`;
    
}

// 화살표 클릭 이벤트 함수
function handleArrowClick(event) {
    const arrowClassLists = event.target.classList;
    
    if(arrowClassLists.contains("right-arrow")) {
        const imgNumberArr = changeImgNumber("right");
        paintImage();
        paintDot(imgNumberArr);
    } else {
        const imgNumberArr = changeImgNumber("left");
        paintImage();
        paintDot(imgNumberArr);
    }
}

// 점 클릭 이벤트 함수
function handleDotClick(event) {
    const dotId = event.target.id;
    const num = dotId.substring(3);

    let imgNumberArr = [];
    imgNumberArr.push(imgNumber);
    imgNumber = parseInt(num);
    imgNumberArr.push(imgNumber);

    paintImage();
    paintDot(imgNumberArr);
}


leftArrow.addEventListener("click",handleArrowClick);
rightArrow.addEventListener("click",handleArrowClick);
for(let i = 1 ; i <= IMG_TOTAL; ++i) {
    const dot = document.getElementById(`dot${i}`);
    dot.addEventListener("click",handleDotClick);
}
paintImage();
paintDot([1,1]);
