let startBtn = document.getElementsByClassName("start-game")[0];
let modal = document.getElementsByClassName("enter-name-container")[0];
let player1;
let player2;
let isGameOver = false;

let enter = new Audio("enter.mp3");
let gameWon = new Audio("won.mp3");

let container = document.getElementsByClassName("container")[0];

let resetbtn = document.getElementsByClassName("reset")[0];
let clearbtn = document.getElementsByClassName("clear")[0];

let boxes = document.getElementsByClassName("box");

let count = 0;

let whichTurn;
let turn = document.getElementsByClassName("turn")[0];
startBtn.addEventListener("submit", (e)=>{
   e.preventDefault();
   isGameOver = false;
   for(let i=0;i<boxes.length;i++)
    {
     boxes[i].innerHTML = "";
     boxes[i].style.backgroundColor = "";
    }
   player1 = document.getElementById("player-1").value;
   player2 = document.getElementById("player-2").value;
   whichTurn = `${player1}`;
   
   turn.innerHTML = whichTurn + " your Turn";
   modal.style.display= "none";
   container.style.display= "flex";
   turn.style.color = "black";
   count = 0;
})


let turnText = "X";

function changeTurn()
{
    if(isGameOver == false)
    {
        turnText =  turnText === "X"?"O":"X";
        turn.innerHTML = turn.innerHTML === `${player1} your Turn`? `${player2} your Turn` : `${player1} your Turn`;
        whichTurn = whichTurn === `${player1}`?`${player2}`:`${player1}`;
        
    }  
}

Array.from(boxes).forEach((element) => {
    element.addEventListener("click", (e)=> {
        if(element.innerHTML === '' && isGameOver == false)
        {
            element.innerHTML = turnText;
            changeTurn();
            count++;
            checkWin();
            enter.play();
        }
        
    })
})

clearbtn.addEventListener("click", () => {
    for(let i=0;i<boxes.length;i++)
    {
     boxes[i].innerHTML = "";
     boxes[i].style.backgroundColor = "";
    }
    isGameOver = false;
    turnText = "X";
    whichTurn = `${player1}`;
    turn.innerHTML = whichTurn + " your Turn";
    turn.style.color = "black";
    count = 0;
 })

 resetbtn.addEventListener("click", ()=>
{
    modal.style.display = "flex";
    container.style.display= "none";
    turnText = "X";
    player1 = "";
    player2 = "";
    turn.style.color = "black";
    count = 0;
})

 function checkWin()
 {
   let winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
   ]
   winCombos.forEach((e) => {

    if((boxes[e[0]].innerHTML === boxes[e[1]].innerHTML) && (boxes[e[0]].innerHTML === boxes[e[2]].innerHTML) && (boxes[e[0]].innerHTML !== ''))
    {
        whichTurn = whichTurn === `${player1}`?`${player2}`:`${player1}`;
        turn.innerHTML = whichTurn + " you won";
        turn.style.color = "green";
        isGameOver = true;
        boxes[e[0]].style.backgroundColor = "green";
        boxes[e[1]].style.backgroundColor = "green";
        boxes[e[2]].style.backgroundColor = "green";
        gameWon.play();
    }
   })

   if(count === 9 && isGameOver === false)
   {
    turn.innerHTML = "Oops! No one won. Try again!";
    turn.style.color = "red";
    
   }
 }



