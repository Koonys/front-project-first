let setNum = 0;
let playBtn = document.getElementById("playBtn");
let userInput = document.getElementById("userInput");
let result = document.getElementById("resultArea");
let resetBtn = document.getElementById("resetBtn");
let chance = 5;
let gameOver = false;
let chanceArea = document.getElementById("chanceArea");
let history = [];

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click",reset);
userInput.addEventListener("focus", function(){
    userInput.value="";
});

function randomNum(){
    setNum = Math.floor(Math.random()*100)+1;
    console.log("정답 :"+setNum)
}


function play(){
    let userVal = userInput.value;

    if(userVal<1||userVal>100){
        result.textContent="1과100 사이의 숫자를 입력해주세요"
        return;
    }else if(history.includes(userVal)){
        result.textContent="중복된 숫자를 입력하셨습니다 다른 숫자를 입력해주세요"
        return;
    }
    chance--;
    chanceArea.textContent=`남은기회 : ${chance}번`;
    if(userVal < setNum){
        result.textContent = "UP!!!"
    }else if(userVal > setNum){
        result.textContent = "DOWN!!!"
    }else{
        result.textContent = "정답!!!"
        gameOver = true;
    }

    history.push(userVal);
    console.log(history);

    if(chance < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playBtn.disabled = true;
    }
}

function reset(){
    randomNum();
    result.textContent = "결과출력";
    userInput.value = "";
    playBtn.disabled = false;
    gameOver = false;
    chance = 5;
    chanceArea.textContent=`남은기회 : ${chance}번`;
    history = [];
}

randomNum();