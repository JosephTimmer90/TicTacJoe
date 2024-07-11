//declare multi-player variables and variables used for both multi and single player games
const playingSpaceIDArray = [];
let playingPiece = 'X';
let gameBoard = ['','','','','','','','','']
let winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
let winningConditionIndex = null;
let XLocations = [];
let OLocations = [];
let multiplayerGame = false;
let singlePlayerGame = false;
let mPlayerXWins = 0;
let mPlayerOWins = 0;
let mPlayerTotalGames = 0;
//declare variables for single player game
let roundNumber = 1;
let userPlayingPiece = 'O';
let computerPlayingPiece = 'X';
let sPlayerComputerWins = 0;
let sPlayerUserWins = 0;
let sPlayerTotalGames = 0;

//Sound Effects for user moves and computer moves
function playStartGameSound() {
    let audio = document.getElementById("start-game-sound");
    audio.play();
}
function playUserMoveSound() {
   let audio = document.getElementById("user-move-sound");
   audio.play();
}
function playEndGameSound() {
    let audio = document.getElementById("end-game-sound");
    audio.play();
}
function addStartGameSoundEvent(){
    document.getElementById('start-multi').addEventListener('click', playStartGameSound);
    document.getElementById('start-single-1').addEventListener('click', playStartGameSound);
    document.getElementById('start-single-2').addEventListener('click', playStartGameSound);
}
function addUserMoveSoundEvent(){
    document.getElementById('game-board').addEventListener("click", playUserMoveSound);
}
addUserMoveSoundEvent();
addStartGameSoundEvent();

//Multiplayer game
function fillPlayingSpaceIDArray(){
    for(i=0; i<9; i++){
        playingSpaceIDArray[i] = `ps-${i}`;
    }
}

function resetGameBoard(){
    gameBoard = ['','','','','','','','',''];
    winningConditionIndex = null;
    for(i=0; i<playingSpaceIDArray.length; i++){
        document.getElementById(playingSpaceIDArray[i]).innerHTML = '-';
        document.getElementById(playingSpaceIDArray[i]).style.fontSize = '3rem';
    }
}

function startMultiplayerGame(){
    multiplayerGame = true;
    resetGameBoard();
    document.getElementById('dialog-box-content').innerHTML = 'Ready to start multiplayer game! X goes first.';
    playingPiece = 'X';
    addPlayingSpaceEventListeners();
}

function upDateGameBoard(){
    for(i=0; i<gameBoard.length; i++){
        gameBoard[i] = document.getElementById(playingSpaceIDArray[i]).innerHTML;
    }
    XLocations = [];
    OLocations = [];
    for(i=0; i<gameBoard.length; i++){
        if(gameBoard[i]==='X'){
            XLocations.push(i);
        }
        else if(gameBoard[i]==='O'){
            OLocations.push(i);
        }
    }
}

function upDateSpace(){
    this.innerHTML=playingPiece;
    if(playingPiece === 'X'){
        playingPiece = 'O';
    }
    else if(playingPiece === 'O'){
        playingPiece = 'X';
    }
    this.removeEventListener('click', upDateSpace);
    upDateGameBoard();
    detectWins();
    if(singlePlayerGame === true){
        computerMoves();
    }
}

function addPlayingSpaceEventListeners(){
    for(i=0; i<playingSpaceIDArray.length; i++){
        document.getElementById(playingSpaceIDArray[i]).addEventListener('click', upDateSpace);
    }
}

function displayWinStrike(){
    let playingPieceCenter = gameBoard[4];
    switch(winningConditionIndex){
        case 0:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: 42rem; height: .5rem; background-color: white; border-radius: 3px; position: absolute; top: -80px';
            break;
        case 1:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: 42rem; height: .5rem; background-color: white; border-radius: 3px; position: absolute; top: 6rem';
            break;
        case 2:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: 42rem; height: .5rem; background-color: white; border-radius: 3px; position: absolute; top: 225px';
            break;
        case 3:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: .5rem; height: 42rem; background-color: white; border-radius: 3px; position: absolute; left: -80px';
            break;
        case 4:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: .5rem; height: 42rem; background-color: white; border-radius: 3px; position: absolute; left: 6rem';
            break;
        case 5:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText = 'display: flex; justify-content: center; align-items: center; position: relative; font-size: 6rem;';
            document.getElementById('win-strike').style.cssText = 'width: .5rem; height: 42rem; background-color: white; border-radius: 3px; position: absolute; left: 225px';
            break;
        case 6:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText="display: flex; justify-content: center; align-items: center; font-size: 6rem;";
            document.getElementById('win-strike').style.cssText="position: absolute; width: .5rem; height: 54rem; background-color: white; border: 1px solid white; border-radius: 3px; transform: rotate(-45deg);";
            break;
        case 7:
            document.getElementById('ps-4').innerHTML=`${playingPieceCenter} <div id="win-strike"></div>`;
            document.getElementById('ps-4').style.cssText="display: flex; justify-content: center; align-items: center; font-size: 6rem;";
            document.getElementById('win-strike').style.cssText="position: absolute; width: .5rem; height: 54rem; background-color: white; border: 1px solid white; border-radius: 3px; transform: rotate(45deg);";
            break;

        default:
            console.log('The switch statment is broken');
        };
        playEndGameSound();
}

//add statistics functionality
function updateStatistics(){

}

function detectWins(){
    let XWins = false;
    let OWins = false;
    for(i=0; i<winningConditions.length; i++){        
        if(XLocations.includes(winningConditions[i][0]) && XLocations.includes(winningConditions[i][1]) && XLocations.includes(winningConditions[i][2])){
            winningConditionIndex = i;
            XWins = true;
        }
        if(OLocations.includes(winningConditions[i][0]) && OLocations.includes(winningConditions[i][1]) && OLocations.includes(winningConditions[i][2])){
            winningConditionIndex = i;
            OWins = true;
        }
        if(XWins){
            document.getElementById('dialog-box-content').innerHTML = 'X Wins!!!';
            for(i=0; i<playingSpaceIDArray.length; i++){
                document.getElementById(playingSpaceIDArray[i]).removeEventListener('click', upDateSpace);
                document.getElementById(playingSpaceIDArray[i]).style.fontSize = '6rem';
            }
            if(singlePlayerGame===true){
                sPlayerComputerWins++;
                sPlayerTotalGames++;
                document.getElementById('computer-wins-count-value').innerHTML = sPlayerComputerWins;
                document.getElementById('total-sp-games-count-value').innerHTML = sPlayerTotalGames;
            }
            if(multiplayerGame===true){
                mPlayerXWins++;
                mPlayerTotalGames++;
                document.getElementById('x-wins-count-value').innerHTML = mPlayerXWins;
                document.getElementById('total-mp-games-count-value').innerHTML = mPlayerTotalGames;
            }
            displayWinStrike();
            multiplayerGame = false;
            singlePlayerGame = false;
        }
        if(OWins){
            document.getElementById('dialog-box-content').innerHTML = 'O Wins!!!';
            for(i=0; i<playingSpaceIDArray.length; i++){
                document.getElementById(playingSpaceIDArray[i]).removeEventListener('click', upDateSpace);
                document.getElementById(playingSpaceIDArray[i]).style.fontSize = '6rem';
            }
            if(singlePlayerGame===true){
                sPlayerUserWins++;
                sPlayerTotalGames++;
                document.getElementById('user-wins-count-value').innerHTML = sPlayerComputerWins;
                document.getElementById('total-sp-games-count-value').innerHTML = sPlayerTotalGames;
            }
            if(multiplayerGame===true){
                mPlayerOWins++;
                mPlayerTotalGames++;
                document.getElementById('o-wins-count-value').innerHTML = mPlayerOWins;
                document.getElementById('total-mp-games-count-value').innerHTML = mPlayerTotalGames;
            }
            displayWinStrike();
            multiplayerGame = false;
            singlePlayerGame = false;
        }
    }
}

document.getElementById('start-multi').addEventListener('click', startMultiplayerGame);
fillPlayingSpaceIDArray();
addPlayingSpaceEventListeners();

// Single player game
function startSinglePlayerGame(){
    singlePlayerGame = true;
    multiplayerGame = false;
    roundNumber = 1;
    computerMoves();
}

function upDateSpaceComputerMove(){
    playUserMoveSound();
    playingPiece = 'O';
    upDateGameBoard();
    detectWins();
}

function detectTwoInARow(playingPiece){
    let returnString = 'none';
    gameBoardArray = [[gameBoard[0], gameBoard[1], gameBoard[2]],
                        [gameBoard[3], gameBoard[4], gameBoard[5]],
                      [gameBoard[6], gameBoard[7], gameBoard[8]]];
    //Detect 2 in a row horizontal starting from the left
    for(let i=0; i<3; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i][j+1] === playingPiece){
                    if(gameBoardArray[i][j+2] !== userPlayingPiece && gameBoardArray[i][j+2] !== computerPlayingPiece){
                        console.log(`hfl i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[i*3+j+2];
                    }
                }
            }
        }
    }
    //Detect 2 in a row vertical starting from the top
    for(let i = 0; i<1; i++){
        for(let j = 0; j<3; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i+1][j]===playingPiece){
                    if(gameBoardArray[i+2][j] !==userPlayingPiece && gameBoardArray[i+2][j] !== computerPlayingPiece){
                        console.log(`vft i: ${i} and j: ${j}.`)
                        returnString = playingSpaceIDArray[(i+2)*3+j];
                    }
                }
            }
        }
    }
    //Detect 2 in a row horizontal starting from the right
    for(let i=0; i<3; i++){
        for(let j=2; j>1; j--){
            if(gameBoardArray[i][j]===playingPiece){
                if(gameBoardArray[i][j-1]===playingPiece){
                    if(gameBoardArray[i][j-2] !== userPlayingPiece && gameBoardArray[i][j-2] !== computerPlayingPiece){
                        console.log(`hfr i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[i*3+j-2];
                    }
                }
            }
        }
    }
    
    //detect 2 in a row vertical starting from the bottom
    for(let i=2; i>1; i--){
        for(let j=0; j<3; j++){
            if(gameBoardArray[i][j]===playingPiece){
                if(gameBoardArray[i-1][j]===playingPiece){
                    if(gameBoardArray[i-2][j] !== userPlayingPiece && gameBoardArray[i-2][j] !== computerPlayingPiece){
                        console.log(`vfb i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i-2)*3 +j];
                    }
                }
            }
        }
    } 
    
    //detect 2 horizontally on edges
    for(let i=0; i<3; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i][j+2] === playingPiece){
                    if(gameBoardArray[i][j+1] !== userPlayingPiece && gameBoardArray[i][j+1] !== computerPlayingPiece){
                        console.log(`hoe i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[i*3+j+1];
                    }
                }
            }
        }
    }

    //Detect 2 vertically on edge
    for(let i = 0; i<1; i++){
        for(let j = 0; j<3; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i+2][j]===playingPiece){
                    if(gameBoardArray[i+1][j] !==userPlayingPiece && gameBoardArray[i+1][j] !== computerPlayingPiece){
                        console.log(`voe i: ${i} and j: ${j}.`)
                        returnString = playingSpaceIDArray[(i+1)*3+j];
                    }
                }
            }
        }
    }

    //Detect 2 in a row diagonally starting from the top left
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i+1][j+1] === playingPiece){
                    if(gameBoardArray[i+2][j+2] !== userPlayingPiece && gameBoardArray[i+2][j+2] !== computerPlayingPiece){
                        console.log(`hfl i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i+2)*3+j+2];
                    }
                }
            }
        }
    }

    //Detect 2 in a row diagonally starting from the top right
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i][j+2] === playingPiece){
                if(gameBoardArray[i+1][j+1] === playingPiece){
                    if(gameBoardArray[i+2][j] !== userPlayingPiece && gameBoardArray[i+2][j] !== computerPlayingPiece){
                        console.log(`hfl i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i+2)*3+j];
                    }
                }
            }
        }
    }

    //Detect 2 in a row diagonally starting from the bottom left
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i+2][j] === playingPiece){
                if(gameBoardArray[i+1][j+1] === playingPiece){
                    if(gameBoardArray[i][j+2] !== userPlayingPiece && gameBoardArray[i][j+2] !== computerPlayingPiece){
                        console.log(`hfl i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i)*3+j+2];
                    }
                }
            }
        }
    }

    //Detect 2 in a row diagonally starting from the bottom right
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i+2][j+2] === playingPiece){
                if(gameBoardArray[i+1][j+1] === playingPiece){
                    if(gameBoardArray[i][j] !== userPlayingPiece && gameBoardArray[i][j] !== computerPlayingPiece){
                        console.log(`hfl i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i)*3+j];
                    }
                }
            }
        }
    }
    //Detect 2 on edge diagonally top left and bottom right
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            if(gameBoardArray[i][j] === playingPiece){
                if(gameBoardArray[i+2][j+2] === playingPiece){
                    if(gameBoardArray[i+1][j+1] !== userPlayingPiece && gameBoardArray[i+2][j+2] !== computerPlayingPiece){
                        console.log(`dtlbr i: ${i} and j: ${j}.`);
                        returnString = playingSpaceIDArray[(i+1)*3+j+1];
                        document.getElementById(playingSpaceIDArray[(i+1)*3+j+1]).style.color = 'red';
                        console.log('Detect 2 on edge diagonally top left and bottom right');
                    }
                }
            }
        }
    }
    
    return returnString;
}

//tests whether a playingspace is empty or not
const isEmpty = (element) => element === '-';
//generates a random move for situations where there are no 2 in a rows and no hard coded moves
function generateRandomMove(){
    let randomMoveLocation = gameBoard.findIndex(isEmpty);
    document.getElementById(playingSpaceIDArray[randomMoveLocation]).innerHTML = computerPlayingPiece;
    document.getElementById(playingSpaceIDArray[randomMoveLocation]).removeEventListener('click', upDateSpace);
}

function computerMoves(){
    switch(roundNumber){
        case 1:
            resetGameBoard();
            document.getElementById('dialog-box-content').innerHTML = 'Ready to start single player game! Computer goes first.';
            playingPiece = 'X';
            addPlayingSpaceEventListeners();
            document.getElementById('ps-0').innerHTML = playingPiece;
            document.getElementById('ps-0').removeEventListener('click', upDateSpace);
            upDateSpaceComputerMove();
            roundNumber = 2;
            break;
        case 2:
            computerMoveRound2();
            upDateSpaceComputerMove();
            roundNumber = 3;
            break;
        case 3:
            if(detectTwoInARow(computerPlayingPiece)!=='none'){
                document.getElementById(detectTwoInARow(computerPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(computerPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else if(detectTwoInARow(userPlayingPiece)!=='none'){
                console.log(detectTwoInARow(userPlayingPiece));
                document.getElementById(detectTwoInARow(userPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(userPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else if(computerMoveRound3 !== 'none'){
                computerMoveRound3();
            }
            else{
                generateRandomMove();
            }
            upDateSpaceComputerMove();
            roundNumber = 4;
            break;
        case 4:
            if(detectTwoInARow(computerPlayingPiece)!=='none'){
                document.getElementById(detectTwoInARow(computerPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(computerPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else if(detectTwoInARow(userPlayingPiece)!=='none'){
                console.log(detectTwoInARow(userPlayingPiece));
                document.getElementById(detectTwoInARow(userPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(userPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else if(computerMoveRound4 !== 'none'){
                computerMoveRound4();
            }
            else{
                generateRandomMove();

            }
            upDateSpaceComputerMove();
            roundNumber = 5;
            break;
        case 5:
            if(detectTwoInARow(computerPlayingPiece)!=='none'){
                document.getElementById(detectTwoInARow(computerPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(computerPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else if(detectTwoInARow(userPlayingPiece)!=='none'){
                console.log(detectTwoInARow(userPlayingPiece));
                document.getElementById(detectTwoInARow(userPlayingPiece)).innerHTML = computerPlayingPiece;
                document.getElementById(detectTwoInARow(userPlayingPiece)).removeEventListener('click', upDateSpace);
            }
            else{
                generateRandomMove();
            }
            upDateSpaceComputerMove();
            if(singlePlayerGame===true){
                sPlayerTotalGames++;
                document.getElementById('total-sp-games-count-value').innerHTML = sPlayerTotalGames;
            }
            document.getElementById('dialog-box-content').innerHTML = 'Draw. &#128577; Ready to start new game!';
            singlePlayerGame = false;
            break;
    }
}

function computerMoveRound2(){
    //round 2
    if(roundNumber === 2){
        if(gameBoard[1]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'){
            document.getElementById('ps-8').innerHTML = "X";
            document.getElementById('ps-8').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[3]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[4]==='O'){
            document.getElementById('ps-8').innerHTML = "X";
            document.getElementById('ps-8').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[5]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[6]==='O'){
            document.getElementById('ps-8').innerHTML = "X";
            document.getElementById('ps-8').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[7]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[8]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else{
            return 'none';
        }
    }
}

function computerMoveRound3(){
    //round 3
    if(roundNumber === 3){
        if(gameBoard[1]==='O' && gameBoard[8]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'&& gameBoard[4]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[3]==='O'&& gameBoard[8]==='O'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[4]==='O'&& gameBoard[2]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[4]==='O' && gameBoard[6]){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[5]==='O'&& gameBoard[8]==='O'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[6]==='O'&& gameBoard[4]==='O'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[7]==='O'&& gameBoard[8]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[8]==='O'&& gameBoard[3]==='O'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'&& gameBoard[6]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'&& gameBoard[5]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[3]==='O'&& gameBoard[6]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[6]==='O'&& gameBoard[7]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[1]==='O'&& gameBoard[2]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else{
            return 'none';
        }
    }
}

function computerMoveRound4(){
    //round 4
    if(roundNumber === 4){
        if(gameBoard[1]==='O' && gameBoard[8]==='O' && gameBoard[2]==='O'){
            document.getElementById('ps-3').innerHTML = "X";
            document.getElementById('ps-3').removeEventListener('click', upDateSpace);
        }
        //This statement requires a fourth condition because the statement below has the same gameboard index numbers.
        else if(gameBoard[1]==='O' && gameBoard[8]==='O' && gameBoard[3]==='O' && gameBoard[2]==='-'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        //This statement requires a fourth condition because the statement below has the same gameboard index numbers.
        else if(gameBoard[1]==='O' && gameBoard[8]==='O' && gameBoard[3]==='O' && gameBoard[4]==='-'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'&& gameBoard[4]==='O' && gameBoard[3]==='O'){
            document.getElementById('ps-7').innerHTML = "X";
            document.getElementById('ps-7').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[2]==='O'&& gameBoard[4]==='O' && gameBoard[7]==='O'){
            document.getElementById('ps-3').innerHTML = "X";
            document.getElementById('ps-3').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[3]==='O'&& gameBoard[8]==='O' && gameBoard[6]==='O'){
            document.getElementById('ps-1').innerHTML = "X";
            document.getElementById('ps-1').removeEventListener('click', upDateSpace);
        }
        //The first else if statement requires a fourth condition because this else if contains the same 'O' conditions
        else if(gameBoard[3]==='O'&& gameBoard[8]==='O' && gameBoard[1]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[4]==='O'&& gameBoard[6]==='O' && gameBoard[1]==='O'){
            document.getElementById('ps-5').innerHTML = "X";
            document.getElementById('ps-5').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[4]==='O' && gameBoard[2] && gameBoard[1]==='O'){
            document.getElementById('ps-3').innerHTML = "X";
            document.getElementById('ps-3').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[5]==='O'&& gameBoard[8]==='O' && gameBoard[6]==='O'){
            document.getElementById('ps-1').innerHTML = "X";
            document.getElementById('ps-1').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[5]==='O'&& gameBoard[8]==='O' && gameBoard[1]==='O'){
            document.getElementById('ps-6').innerHTML = "X";
            document.getElementById('ps-6').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[6]==='O'&& gameBoard[4]==='O' && gameBoard[1]==='O'){
            document.getElementById('ps-5').innerHTML = "X";
            document.getElementById('ps-5').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[6]==='O'&& gameBoard[4]==='O' && gameBoard[5]==='O'){
            document.getElementById('ps-1').innerHTML = "X";
            document.getElementById('ps-1').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[7]==='O'&& gameBoard[8]==='O' && gameBoard[3]==='O'){
            document.getElementById('ps-2').innerHTML = "X";
            document.getElementById('ps-2').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[7]==='O'&& gameBoard[8]==='O' && gameBoard[2]==='O'){
            document.getElementById('ps-3').innerHTML = "X";
            document.getElementById('ps-3').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[8]==='O'&& gameBoard[3]==='O' && gameBoard[4]==='O'){
            document.getElementById('ps-1').innerHTML = "X";
            document.getElementById('ps-1').removeEventListener('click', upDateSpace);
        }
        else if(gameBoard[8]==='O'&& gameBoard[3]==='O' && gameBoard[1]==='O'){
            document.getElementById('ps-4').innerHTML = "X";
            document.getElementById('ps-4').removeEventListener('click', upDateSpace);
        }
        else {
            return 'none';
        }
    }
}

document.getElementById('start-single-1').addEventListener('click', startSinglePlayerGame);
document.getElementById('start-single-2').addEventListener('click', startSinglePlayerGame);
