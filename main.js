let setNum = 0;
let playBtn = document.getElementById("playBtn");
let userInput = document.getElementById("userInput");
let result = document.getElementById("resultArea");
let resetBtn = document.getElementById("resetBtn");
let hintBtn = document.getElementById("hintBtn");
let hintSpan = document.getElementById("hintMessage");
let userHistory = document.getElementById("userHistory");
let chance = 5;
let gameOver = false;
let chanceArea = document.getElementById("chanceArea");
let history = [];
let hintCount = 3;
let difference2 = 0;
let hintMessage="힌트가 필요 없어 보여요!";
let randomRangeNum = randomRange();

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click",reset);
hintBtn.addEventListener("mouseenter",function(e){
   hintMessage = hint(e);
   if(hintCount==0){
    hintSpan.innerText = hintMessage+"\n기회를 전부 소진 했어요";
   }else if(hintCount==3&&chance==5){
    hintSpan.innerText = "게임을 시작해 주세요";
   }else{
    hintSpan.innerText = hintMessage;
   }
});
hintBtn.addEventListener("mouseleave", function(){
    hintBtn.innerText = "HINT";
});
userInput.addEventListener("focus", function(){
    userInput.value="";
});

function randomNum(){
    setNum = Math.floor(Math.random()*100)+1;
}


function play(){
    let userVal = userInput.value;

    if(userVal<1||userVal>100){
        result.textContent="1과 100 사이의 숫자를 입력해주세요"
        result.style.fontSize = "14px";
        userInput.value="";
        return;
    }else if(history.includes(userVal)){
        result.innerHTML="중복된 숫자를 입력하셨습니다.<br>다른 숫자를 입력해 주세요"
        result.style.fontSize = "14px";
        userInput.value="";
        return;
    }
    chance--;
    chanceArea.textContent=`남은기회 : ${chance}번`;
    result.style.fontSize = "30px";
    if(userVal < setNum){
        result.textContent = "UP!!!"
    }else if(userVal > setNum){
        result.textContent = "DOWN!!!"
    }else{
        result.textContent = "정답!!!"
        gameOver = true;
    }

    history.push(userVal);

    if(chance < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playBtn.disabled = true;
    }
    let historyResult = "";
    for(let i=0;i<history.length;i++){
        historyResult += `<td>${history[i]}</td>`;
    }
    userHistory.innerHTML = historyResult;
    userInput.value="";
    if(chance==0){
        result.textContent = "GAME OVER"
    }
}

function reset(){
    randomNum();
    result.textContent = "";
    userInput.value = "";
    playBtn.disabled = false;
    gameOver = false;
    chance = 5;
    chanceArea.textContent=`남은기회 : ${chance}번`;
    history = [];
    hintCount = 2;
    hintMessage = "힌트가 필요 없어 보여요!"
}

function hint(e){
    if(hintCount==0){
        e.preventDefault();
        return hintMessage;
    }
    let userAnswer = history[history.length - 1];
    let difference = Math.abs(setNum - userAnswer);
    let hintRange = chance*10;
    if(difference >= hintRange){
        if(difference!==difference2){
            difference2=difference
            hintCount--;
            randomRangeNum = randomRange();
        }
        let minRange = Math.max(0, setNum - hintRange-randomRangeNum);
        let maxRange = Math.min(100, setNum + hintRange+randomRangeNum);
        return `정답은 ${minRange}에서 ${maxRange}사이에 있습니다.`;
    }
    return "정답에 거의 근접했어요";
}

function randomRange(){
    return Math.floor(Math.random()*10);
}

randomNum();