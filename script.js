let boxes = document.querySelectorAll(".btn");
let game = document.querySelector(".game");
let resetBtn = document.querySelector(".reset");
let pvpBtn = document.querySelector(".start");
let homeBtn = document.querySelector(".home");
let winnerName=document.querySelector(".winnerName");
let computerBtn = document.querySelector(".computer");
let easyBtn = document.querySelector(".easy");
let mediumBtn = document.querySelector(".medium");
let hardBtn = document.querySelector(".hard");
let currentPlayerO = true;
let moveCount=0;
let gameOver = false;

let mode="m";

let board = ["", "", "", "", "", "", "", "", ""];

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
//clik logic
boxes.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        
        if (board[index] !== "" || gameOver) return;

       
        if (mode === "p") {
            if (currentPlayerO) { 
                btn.innerText = "X";
                board[index] = "X";
                currentPlayerO = false;
                btn.classList.add("btnO"); 
                clickSound.currentTime=0;
                clickSound.play();
            } else { 
                btn.innerText = "O";
                board[index] = "O";
                currentPlayerO = true;
                btn.classList.remove("btnO");
                clickSound.currentTime=0;
                clickSound.play();
            }
        } else {
            
            btn.innerText = "X";
            board[index] = "X";
            clickSound.currentTime=0;
            clickSound.play();
        }

        btn.disabled = true;
        moveCount++;
        checkWinner();

        
        if (!gameOver && mode !== "p") {
            setTimeout(() => {
                if (mode === "e") eBotMove();
                else if (mode === "m") mBotMove();
                else if (mode === "h") hBotMove(); 
            }, 150);
        }
    });
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
        gameOver=true;
        clickSound.currentTime=0;
        


        boxes.forEach((btn) => {
            btn.disabled = true;
            
         });
          if(pos1==="X" && pos2 === "X" && pos3 === "X"){
            winSound.play();
          }
          else{
            loseSound.currentTime=1;
            loseSound.play();
          }
        return;

      }
      if(pos1==="X" && pos2 === "X" && pos3 === "X"){
        winSound.play();
      }
      if(pos1==="O" && pos2 === "O" && pos3 === "O"){
        loseSound.play();
      }
            


    }
      

  }
  if (gameOver===false&&moveCount === 9) {
        winnerName.innerText = "Match Draw";
        gameOver = true;
        drawSound.play();
        boxes.forEach((btn) => {
            btn.disabled = true;
           });
        }
};
//button logic
function startNewGame (selectedMode)  {
    mode = selectedMode; 
    winnerName.innerText = "";
    moveCount = 0;
    gameOver = false;
    currentPlayerO = true; 
    board = ["", "", "", "", "", "", "", "", ""];
    
    boxes.forEach((btn) => {
        btn.innerText = "";
        btn.disabled = false;
        btn.classList.remove("btnO");
    });
    
    clickSound.pause();
    winSound.pause();
    drawSound.pause();
    loseSound.pause();
    restSound.play();
    game.classList.remove("hide");
    homeBtn.classList.remove("hide");
    pvpBtn.classList.add("hide");
    computerBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
    easyBtn.classList.add("hide");
    mediumBtn.classList.add("hide");
    hardBtn.classList.add("hide");
};

pvpBtn.addEventListener("click", () => startNewGame("p"));

easyBtn.addEventListener("click", () => startNewGame("e"));

mediumBtn.addEventListener("click", () => startNewGame("m"));

hardBtn.addEventListener("click",()=>startNewGame("h"));

resetBtn.addEventListener("click", () => startNewGame(mode));

computerBtn.addEventListener("click", () => {
    easyBtn.classList.remove("hide");
    mediumBtn.classList.remove("hide");
    hardBtn.classList.remove("hide");
    
    pvpBtn.classList.add("hide");
    computerBtn.classList.add("hide");
    restSound.play();
});

homeBtn.addEventListener("click", () => {
  restSound.play();
  location.reload(); 
});
//move or mode logic
//easy random move
function eBotMove() {
    if(gameOver===true){
      return;
    }

    let mappedBoard = board.map(function (value, index) {
      if (value === "") {
        return index;
      } else {
        return null;
      }
    });

    let emptyIndexes = mappedBoard.filter(function (index) {
      return index !== null;
    });

    if (emptyIndexes.length === 0) return;


    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    board[randomIndex] = "O";
    boxes[randomIndex].innerText = "O";
    boxes[randomIndex].disabled = true;
    moveCount++;

    checkWinner();
}


//medium
//block player 

function mBotMove(){
    if (gameOver) return;

    for (let i = 0; i < winPatterns.length; i++) {
    let pattern = winPatterns[i];

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 === "" && pos2 == "X" && pos3 === "X") {
      writeO(pattern[0]);   return;
    }
  if(pos1 === "X" && pos2 === "" && pos3 === "X"){

     writeO(pattern[1]);    return;
  }
  if(pos1 === "X" && pos2 === "X" && pos3 === ""){
     writeO(pattern[2]);    return; 
  }

  }
eBotMove();
  
}
function hBotMove() {
  ;
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
        
      }
    }
  }

  board[move] = "O";
  boxes[move].innerText = "O";
  boxes[move].disabled = true;
  moveCount++; 
  checkWinner();
}

function writeO(index) {

  boxes[index].innerText="O";
  boxes[index].disabled=true;
  board[index]="O";
    moveCount++;
    checkWinner();
}
function checkWinnerBoard(board) {
  for (let i = 0; i < winPatterns.length; i++) {
    let [a, b, c] = winPatterns[i];

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a]; 
    }
  }

  if (!board.includes("")) {
    return "draw";
  }

  return null; 
}
function minimax(board,isBotTurn){
  let result = checkWinnerBoard(board);
  if (result === "O") return 10;
  if (result === "X") return -10;
  if (result === "draw") return 0;
  if(isBotTurn){
    let bestscore =-Infinity;
    for(let i=0;i<9;i++){
      if(board[i]===""){
        board[i]="O";
        let score=minimax(board,false);
        board[i]="";
        bestscore=Math.max(score,bestscore);
      }
    }
    return bestscore;
  }
  else{
    let bestscore=Infinity;
    for(let i=0;i<9;i++){
      if(board[i]===""){
        board[i]="X";
        let score=minimax(board,true);
        board[i]="";
        bestscore=Math.min(score,bestscore);
      }
    }
    return bestscore;
  }
}


//sound
let clickSound = new Audio("click.mp3");
let winSound = new Audio("win.mp3");
let restSound = new Audio("reset.mp3");
let loseSound = new Audio("lose.mp3");
let drawSound = new Audio("draw.mp3");
