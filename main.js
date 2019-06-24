//global variables

let board = document.querySelectorAll('div[id^="cell-"]');
let startButton = document.getElementById("start");
let statusArea = document.getElementById("statusLine");
let resetButton = document.getElementById('reset')

// game class
class Game {
  constructor() {
    this.turn = false;
    this.message = {
      playerXTurn: "Player X's turn",
      playerOTurn: "Player O's turn",
    };
  }
  playerTurn = () => {
    this.turn = !this.turn;
    if (this.turn) {
      return "playerXTurn";
    } else {
      return "playerOTurn";
    }
  }
  printMessages = (gameStatus) => {
    statusArea.textContent = this.message[gameStatus];
  }
  //
  drawLetter = (turn) => {
    if (turn ==="playerOTurn") {
      return "X";
    } else {
      return "O";
    }
  };
}

//Creates array of the board in current state
let boardArr = []
  let boardArray = () => {
    for (let i = 0; i < board.length; i++) {
      boardArr[i] = board[i].textContent
    }
    return boardArr

  }
  
  //breaks array into 3 sub-arrays in order to be checked for an across or vertical win
  breakIntoSubArrays = (anotherArray)=> {
    boardSubArray1 = anotherArray.slice(0,3)
    boardSubArray2 = anotherArray.slice(3,6)
    boardSubArray3 = anotherArray.slice(6,9)
    rebuiltArray = [boardSubArray1,boardSubArray2,boardSubArray3]
    return rebuiltArray
  }

//checks wins vertically and horizontally
checkWinUpDownAndAcross = (someArray) => {
  for(var i = 0; i<3;i++) {
    var colSum = "";
    for(var j = 0; j<3;j++){
        colSum += someArray[j][i];
    }
    if (colSum === ("OOO")) {
    cancelEventListeners()
    statusArea.textContent = "Circle's Win"
    return true
  } else if (colSum === "XXX") {
    cancelEventListeners()
    statusArea.textContent = "Cross's Win";
    return true
    }
  }
    
  for(var i = 0; i<3;i++){
      var rowSum = "";
      for(var j = 0; j<3;j++){
          rowSum += someArray[i][j];
      }
      if (rowSum === ("OOO")) {
      cancelEventListeners()
      statusArea.textContent = "Circle's Win"
      return true
      } else if (rowSum === "XXX") {
        cancelEventListeners()
        statusArea.textContent = "Cross's Win";
        return true
      }
    }
  }

//checks diagnol wins
checkWinDiagnol = (someArray) => {
  if (someArray[0]+someArray[4]+someArray[8] === "OOO"){
      cancelEventListeners()
      statusArea.textContent = "Circle's Win"
      return true
}
  else if (someArray[0]+someArray[4]+someArray[8] === "XXX"){
      cancelEventListeners()
      statusArea.textContent = "Cross's Win"
      return true
  }
  else if (someArray[2]+someArray[4]+someArray[6] === "OOO"){
    cancelEventListeners()
    statusArea.textContent = "Circle's Win"
    return true
}
  else if (someArray[2]+someArray[4]+someArray[6] === "XXX"){
    cancelEventListeners()
    statusArea.textContent = "Cross's Win"
    return true
  }
}
//check stalemate not working.... yet
/* checkStalemate = (count,checkwin1,checkwin2) => {
  if (count === 9) {
    if (checkwin1 || checkwin2) {
      statusArea.textContent = "Stalemate"
    }
  }
} */

reset = () => {
  window.location.reload(true);
}


// game clock function
 gameClock = (playing=true) => {
  if (playing) {
  let startTime = Date.now()
  time = setInterval(function () {
      let now = new Date().getTime()
      let timer = now - startTime
      let days = Math.floor(timer / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timer % (1000 * 60)) / 1000)
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s "
  })} else {
      clearInterval(time)
        }
  }
  



//creates global game object
let game = new Game();

//starts game
  let startGame = () => {
    startButton.disabled = true;
    let whosTurn = game.playerTurn();
    game.printMessages(whosTurn);
    setUpEventListeners()
    gameClock()
  };

let count = 0
// plays game
 function play (evt) {
    count++
    let whosTurn = game.playerTurn();
    game.printMessages(whosTurn);
    evt.target.textContent = game.drawLetter(whosTurn)
    evt.target.style = 'pointer-events : none'
    let gameBoardArray = boardArray(board)
    let splitUpGameBoardArray = breakIntoSubArrays(gameBoardArray)
    checkWinUpDownAndAcross(splitUpGameBoardArray)
    checkWinDiagnol(gameBoardArray)
    checkStalemate(count,checkWinUpDownAndAcross(splitUpGameBoardArray),checkWinDiagnol(gameBoardArray))
 }

//Event Listeners

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', reset);
  /* gets ahold of all the individual cell elements and puts a click event 
  listener on each of them */

  function setUpEventListeners () {
  board.forEach(function(elem) {
  elem.addEventListener('click', play)}
  )}
 
function cancelEventListeners () {
  let playing = false
  gameClock(playing)
  board.forEach(function(elem) {
  elem.removeEventListener('click', play)}
  )}



