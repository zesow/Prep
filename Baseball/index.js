const numberInput = document.getElementById("numberInput"),
    gameList = document.querySelector(".gameList");

let chance = 9;
let randomNumberOfThisGame;

/**
 * 
 * 3개의 숫자가 잘 입력되었는지 판단해 줍니다.
 */
function isThreeNumber(input) {

    // 세 자리가 아닌 경우
    if(input.length !== 3)
        return false;

    // 숫자가 아닌 것이 섞여 있는 경우
    for(let i = 0 ; i < input.length; ++i) {
        if(isNaN(input[i]))
            return false;
    }

    // 중복숫자 찾는 방법1. 이중 for 문
    for(let i = 0 ; i < input.length; ++i) {
        for(let j = i + 1 ; j < input.length; ++j) {
            if(input[i] === input[j]) {
                return false;
            }
        }
    }
    
    return true;
}

/**
 * 
 * 중복되지 않는 랜덤번호를 생성합니다.
 */
function genRandomNumber() {
    let randomNumber = "";

    const letters = ['0','1','2','3','4','5','6','7','8','9'];

    // 중복숫자 찾는 방법2. key value 사용해서 이미 있는 것 표시해주기
    // 중복숫자 방지를 위해 숫자 하나마다 Dictionary에 표시
    const letterDictionary = {};

    while(true) {
        if(randomNumber.length === 3)
            break;
        
        const selectedNum = letters[Math.floor(Math.random() * 10)];
        if(selectedNum in letterDictionary)
            continue;
        
        randomNumber += selectedNum;
        letterDictionary[selectedNum] = 1;
    }

    return randomNumber;
}

/**
 * 
 * 게임을 합니다.
 */
function playGame(input) {
    if(!randomNumberOfThisGame) randomNumberOfThisGame = genRandomNumber();

    console.log(randomNumberOfThisGame);

    const score = {
        strike : 0,
        ball : 0,
        inputNumber : input
    }

    for(let i = 0 ; i < 3 ; ++i) {
        // 사용자 선택 숫자 하나 선택
        const oneOfUserNumber = input[i];
        for(let j = 0 ; j < 3 ; ++j) {
            // 랜덤 번호 하나 선택
            const oneOfRandomNumber =  randomNumberOfThisGame[j];

            // 일단 숫자가 같다
            if(oneOfUserNumber === oneOfRandomNumber) {
                // 숫지 위치도 같다 === 스트라이크
                if(i === j) {
                    score.strike += 1;
                }
                // 위치는 다르다 === 볼
                else {
                    score.ball += 1;
                }

                // 중복숫자 없으니까 더이상 비교할 필요 없음.
                break;
            }
        }
    }

    return score;
}

/**
 * 
 * 게임의 결과를 파라미터로 받아서 결과를 판단해 줍니다.
 */
function resultOfThisGame(score) {

    // 이번 게임 결과 만들고 발표하기
    let text = `입력 숫자 : ${score.inputNumber}, Strike : ${score.strike} / Ball : ${score.ball}`;
    alert(text);

    // 게임 결과 리스트에 만들고 표시해주기
    const span = document.createElement("span");
    const newId = 10-chance;
    const li = document.createElement("li");

    
    // 3 strike === 승리
    if(score.strike === 3) {
        alert('게임에서 승리하셨습니다! 축하합니다. ');
        text += ` 정답 : ${randomNumberOfThisGame}`
        numberInput.disabled = true;
    }

    span.innerText = text;
    li.appendChild(span);
    li.id = newId;

    gameList.appendChild(li);

}

/**
 * 
 * 게임 찬스를 하나 감소시키고, 남은 게임 기회를 보여줍니다.
 */
function decreaseChance() {
    chance -= 1;
    alert(`찬스가 ${chance} 번 남았습니다.`);

    // 게임 종료
    if(chance === 0) {
        alert('찬스 소진으로 인해 게임 종료되었습니다.');

        const text = `정답은 ${randomNumberOfThisGame} 였습니다. 다음 기회를 노려보세요.`
        const span = document.createElement("span");
        const newId = 10-chance;
        const li = document.createElement("li");
        span.innerText = text;
        li.appendChild(span);
        li.id = newId;
        gameList.appendChild(li);

        numberInput.disabled = true;
    }
}

numberInput.focus();

/**
 * 메인 메소드에 해당합니다.
 * Input 박스 엔터를 누를 시 이벤트(야구게임)가 발동됩니다.
 */
numberInput.addEventListener("keyup", function(event) {
    
    if(event.key === "Enter") {
        const input = numberInput.value;

        if(!isThreeNumber(input)) {
            // 입력이 잘 못 들어온 경우
            alert("입력값이 잘못되었습니다! 중복되지 않는 숫자 세 개를 정확히 입력해 주세요.");
        }
        else {
            // 입력이 잘 들어온 경우 게임 플레이 시작.
            const score = playGame(input);
            console.log(score);

            // 지금 게임 결과 알려줌. 3 strike면 승리로 게임 종료
            resultOfThisGame(score);

            // 게임 기회 1회 감소. 0번이 될 경우 game over.
            decreaseChance();

            numberInput.value = "";
        }
    }
});