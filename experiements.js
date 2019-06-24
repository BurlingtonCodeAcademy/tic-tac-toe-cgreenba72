/* boardArr = ['x','','','o','o','x','x','x','o']

fillEmptyString = (someArray) => {
  let count = 0
  for (let i = 0; i < someArray.length; i++){
    if (someArray[i]===''){
      someArray[i] = count++
    }   
  }
return someArray
}
console.log(fillEmptyString(boardArr))

checkWin = () => {
  for (let i = 0; i < boardArr.length; i++){
    if (boardArr[i] === ""){
      return false
    }
  } 
  // checks horizontal
  for (let i = 0; i < boardArr.length; i++){
    if (boardArr[i] === boardArr[i] && boardArr[i] === boardArr[i+1] && boardArr[i] === boardArr[i+2]) {
      return true
    }
  }
  // checks vertical
  for (let i = 0; i < boardArr.length; i++){
    if (boardArr[i] === boardArr[i] && boardArr[i] === boardArr[i+3] && boardArr[i] === boardArr[i+6]) {
      return true
    }
  }
  //checks left to right diagnol
  if (boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8]){
    return true
  }
  // checks right to left diagnol
  if (boardArr[2] === boardArr[4] && boardArr[4] ===boardArr[6]){
    return true
  }
}
console.log(checkWin()) */


boardArr2 = [['x','o','x'],
            ['o','o','x',]
            ['x','x','x']]


//onsole.log(boardSubArray1)
//console.log(boardSubArray2)
//console.log(boardSubArray3)

console.log(rebuiltArray)     
letterValue = {
  x : 1,
  o : 2,
}
//console.log(letterValue.x)
breakIntoSubArrays = (anotherArray)=> {
  boardSubArray1 = boardArr2.slice(0,3)
  boardSubArray2 = boardArr2.slice(3,6)
  boardSubArray3 = boardArr2.slice(6,9)
  rebuiltArray = [boardSubArray1,boardSubArray2,boardSubArray3]
  return rebuiltArray
}

  //console.log(boardArr2)
  //console.log(boardArr2[0][1])

  for(var i = 0; i<3;i++){
    //console.log(i)
    var colSum = "";
    for(var j = 0; j<3;j++){
      //console.log(boardArr2[i][j])
        colSum += rebuiltArray[j][i];
        //console.log(colSum)
    }
    if(colSum === ("ooo"))
        console.log("Circle WIN!");
    else if(colSum === "xxx")
        console.log("Cross WIN!");
}

//console.log(colSum)