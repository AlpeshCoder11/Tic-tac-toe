let boxes = document.querySelectorAll(".btn");
let game = document.querySelector(".game");
let resetBtn = document.querySelector(".reset");
let starBtn = document.querySelector(".start");
let homeBtn = document.querySelector(".home");
let winnerName=document.querySelector(".winnerName");
let computerBtn = document.querySelector(".computer");
let easyBtn = document.querySelector(".easy");
let mediumBtn = document.querySelector(".medium");
let hardBtn = document.querySelector(".hard");
let currentPlayerO = true;
let moveCount=0;

let winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

resetBtn.classList.add("hide");
easyBtn.classList.add("hide");
mediumBtn.classList.add("hide");
hardBtn.classList.add("hide");
boxes.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(currentPlayerO === true){
            btn.innerText= "X";
            currentPlayerO = false;
            btn.classList.add("btnO");
            btn.disabled = true;
            
        }
        else{
            btn.innerText="O"
            currentPlayerO = true;
             btn.classList.remove("btnO");
             btn.disabled = true;
        }
       moveCount++;
       checkWinner();
      
    })
   
});

const checkWinner = () => {
  for (let i = 0; i < winPatterns.length; i++) {
    let pattern = winPatterns[i];

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerName.innerText="the winner is player"+pos1;

        boxes.forEach((btn) => {
            btn.disabled = true;
            
         });
        return; 
      }


    }
      if (moveCount === 9) {
          winnerName.innerText = "Match Draw";

        boxes.forEach((btn) => {
            btn.disabled = true;
           });
        }

  }
};


resetBtn.addEventListener("click",()=>{
  currentPlayerO=false;
  winnerName.innerText="";
  moveCount=0;

   boxes.forEach((btn) => {
            btn.disabled = false;
            btn.innerText= "";
         });
    
  
});

starBtn.addEventListener("click",()=>{
  currentPlayerO=false;
  winnerName.innerText="";
  game.classList.remove("hide");
  homeBtn.classList.remove("hide");
  starBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
 



   boxes.forEach((btn) => {
            btn.disabled = false;
            btn.innerText= "";
         });
    
  
});
homeBtn.addEventListener("click",()=>{
  game.classList.add("hide");
  homeBtn.classList.add("hide");
  starBtn.classList.remove("hide");
  resetBtn.classList.add("hide");
});

computerBtn.addEventListener("click",()=>{
  easyBtn.classList.remove("hide");
  mediumBtn.classList.remove("hide");
  hardBtn.classList.remove("hide");
  game.classList.add("hide");
  homeBtn.classList.add("hide");
  starBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  computerBtn.classList.add("hide");

})
