let userscore = 0;
let compscore = 0;
let trialCount=0;
const maxTrials = 10;
const userscorepara = document.querySelector("#userScore");
const compscorepara = document.querySelector("#compScore")
const restartbtn = document.getElementById("restart");
const choices = document.querySelectorAll(".choice");
let msg = document.getElementById("msg");

const genCompChoice = ()=>{
   const options = ["rock","paper","scissors"];
   const randIdx = Math.floor(Math.random() * 3);
   return options[randIdx];
}

const showWinner = (userWin,userchoice,compchoice) =>{
    if(userWin){
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You Win! your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compscore++;
        compscorepara.innerText = compscore;
        msg.innerText = `Computer Win! ${compchoice} beats your ${userchoice}`;
        msg.style.backgroundColor = "red";

    }
}


const playGame = (userchoice) =>{
    if(trialCount>=maxTrials) return;
    trialCount++;
    // console.log(" user choice =",userchoice);
   //generate computer choice->modular 
   const compchoice = genCompChoice();
//    console.log("comp choice =", compchoice);

   if(userchoice === compchoice){
    msg.innerText = "Game was draw!";
    msg.style.backgroundColor = "#081b31";
   }
   else{
    let userWin = true;
    if(userchoice === 'rock'){
        //scissors,paper
      userWin =  compchoice === 'paper' ? false :true;
    }
    else if (userchoice === 'paper'){
        //scissors,rock
       userWin =  compchoice === 'scissors' ? false : true;
    }
    else{
   //rock,paper
   userWin = compchoice === 'rock' ? false : true;
    }
    showWinner(userWin,userchoice,compchoice);
   }

   if(trialCount===maxTrials){
    finalResult();
   }
};

const finalResult =()=>{
    if(userscore>compscore){
        msg.style.backgroundColor = "green";
        msg.innerText= `Game Over!! Your are the final winner`;
    }
    if(compscore>userscore){
        msg.style.backgroundColor = "red";
        msg.innerText= `Game Over!! Computer is the final winner`;
    }
    else{
        msg.style.backgroundColor = "#081b31";
        msg.innerText= `Game Over!! It's a draw.`;
    }
    //disable choices
    choices.forEach(choice => choice.style.pointerEvents = "none"); 
}


choices.forEach((choice)=>{
     choice.addEventListener("click",()=>{
        const userchoice = choice.getAttribute("id");
     playGame(userchoice);
     })
});

restartbtn.addEventListener("click",()=>{
    userscore=0;
    compscore=0;
    trialCount=0;
    userscorepara.innerText=userscore;
    compscorepara.innerText=compscore;
    msg.innerText="Play your move";
    msg.style.backgroundColor = "081b31"
    choices.forEach(choice => choice.style.pointerEvents = "auto");
})
