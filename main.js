let board = document.querySelectorAll('div[id^="cell-"]');
let startButton = document.getElementById("start");
let statusArea = document.getElementById("statusLine");
let playClock = true;

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


checkWinUpDownAndAcross = (someArray) => {
  for(var i = 0; i<3;i++) {
    var colSum = "";
    for(var j = 0; j<3;j++){
        colSum += someArray[j][i];
    }
    if (colSum === ("OOO")) {
    cancelEventListeners()
    statusArea.textContent = "Circle's Win"
  } else if (colSum === "XXX") {
    cancelEventListeners()
    statusArea.textContent = "Cross's Win";;
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
      } else if (rowSum === "XXX") {
        cancelEventListeners()
        statusArea.textContent = "Cross's Win";
      }
  }
}


checkWinDiagnol = (someArray) => {
  if (someArray[0]+someArray[4]+someArray[8] === "OOO"){
      cancelEventListeners()
      statusArea.textContent = "Circle's Win"
}
  else if (someArray[0]+someArray[4]+someArray[8] === "XXX"){
      cancelEventListeners()
      statusArea.textContent = "Cross's Win"
  }
  else if (someArray[2]+someArray[4]+someArray[6] === "OOO"){
    cancelEventListeners()
    statusArea.textContent = "Circle's Win"
}
  else if (someArray[2]+someArray[4]+someArray[6] === "XXX"){
    cancelEventListeners()
    statusArea.textContent = "Cross's Win"
  }
}



function gameClock() {
  let startTime = Date.now()
  t = setInterval(function () {
      let now = new Date().getTime()
      let timer = now - startTime
      let days = Math.floor(timer / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timer % (1000 * 60)) / 1000)
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s "
  })}


//creates global game object
let game = new Game();


  let startGame = () => {
    startButton.disabled = true;
    let whosTurn = game.playerTurn();
    game.printMessages(whosTurn);
    setUpEventListeners()
  };




  /* gets ahold of all the individual cell elements and puts a click event 
  listener on each of them */
  function setUpEventListeners () {
    board.forEach(function(elem) {
    elem.addEventListener('click', play)}
    )}
   
  function cancelEventListeners () {
    board.forEach(function(elem) {
    elem.removeEventListener('click', play)}
    )}


 function play (evt) {
    let whosTurn = game.playerTurn();
    game.printMessages(whosTurn);
    evt.target.textContent = game.drawLetter(whosTurn)
    evt.target.style = 'pointer-events : none'
    let gameBoardArray = boardArray(board)
    let splitUpGameBoardArray = breakIntoSubArrays(gameBoardArray)
    checkWinUpDownAndAcross(splitUpGameBoardArray)
    checkWinDiagnol(gameBoardArray)
 }


startButton.addEventListener("click", startGame);
startButton.addEventListener('click', gameClock);



