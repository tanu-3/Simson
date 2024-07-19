let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if(started == false){ //game ko 1 baar hi start krne ke liye
        console.log("Game Started!");
        started = true;

        leveUp();
    }
});

function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash (btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function leveUp(){
    //isse hum agr 3 level pr h to 3 button ko press krna hoga wo hojaega
    userSeq = []; 
    level++;
    h2.innerText = `Level ${level}`;

    let randmIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randmIdx];
    let randmBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randmBtn);
}

function checkAns(idx) {
    // let idx = level - 1;
    if (userSeq[idx] === gameSeq[idx]){
        // console.log("Same Value");
        if (userSeq.length == gameSeq.length){
            setTimeout(leveUp, 1000);
        }
    } else{
        highestScore = Math.max(highestScore, level - 1);
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br> <b>Highest Score: ${highestScore}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    // console.log('Btn pressed!');
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// last m agr glt button click kr diya to wapis start krne ke liye
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
