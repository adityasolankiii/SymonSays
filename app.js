let gameSeq = [];
let userSeq = [];

let btns = ["green","yellow","red","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

//Game Start
document.addEventListener("keypress", function (){
    if(started==false){
        started=true;
        console.log("Game is started!");

        levelUp();
    } 
});

//-----------------------------------------LevelUp and Button Flash---------------------------------------
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;

    //Random btn flash
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);   
};


//----------------------    --------random btn flash------------------------------------
function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
};


//-------------------------btn flash when user click--------------------------------
function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
};


//--------------------------------Button Event Listners------------------------------

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over!</br>Your Score was <b>${level}</b></br>Press any to key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
};

function btnPress(){
    //console.log(this);
    let btn = this;
    userFlash(btn);   //btn flash when user click

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};


//------------------------Game Reset------------------------------

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}