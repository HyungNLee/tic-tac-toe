function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.turn = false;
  this.owns = [];
}

function Square(position) {
  this.position = position;
  this.owner = "";
}

var playerOne = new Player("Player One", "X");
var playerTwo = new Player("Player Two", "O");

var allPlayers = {};
allPlayers["p1"] = playerOne;
allPlayers["p2"] = playerTwo;

var gameBoard = [];
for (i = 0; i < 9; i++) {
  gameBoard.push(new Square(i + 1));
}

//Function to switch turn
function switchTurn() {
  allPlayers.p1.turn = !allPlayers.p1.turn;
  allPlayers.p2.turn = !allPlayers.p2.turn;
  if (allPlayers.p1.turn) {
    $(".playerTurnName").text(allPlayers.p1.name);
    return "p1";
  } else if (allPlayers.p2.turn) {
    $(".playerTurnName").text(allPlayers.p2.name);
    return "p2";
  }
}

// function selectSquareClick(playerTurn) {
//
// }

function winCondition(playerTurn) {
  var playerOwns = allPlayers[playerTurn].owns;
  if (playerOwns.includes(0) && playerOwns.includes(1) && playerOwns.includes(2)) {
    return true;
  } else if (playerOwns.includes(3) && playerOwns.includes(4) && playerOwns.includes(5)) {
    return true;
  } else if (playerOwns.includes(6) && playerOwns.includes(7) && playerOwns.includes(8)) {
    return true;
  } else if (playerOwns.includes(0) && playerOwns.includes(3) && playerOwns.includes(6)) {
    return true;
  } else if (playerOwns.includes(1) && playerOwns.includes(4) && playerOwns.includes(7)) {
    return true;
  } else if (playerOwns.includes(2) && playerOwns.includes(5) && playerOwns.includes(8)) {
    return true;
  } else if (playerOwns.includes(0) && playerOwns.includes(4) && playerOwns.includes(8)) {
    return true;
  } else if (playerOwns.includes(2) && playerOwns.includes(4) && playerOwns.includes(6)) {
    return true;
  } else {
    return playerTurn;
  }
}

//reset game function
function resetGame() {
  $(".playerTurnName").text(allPlayers.p1.name);
  allPlayers.p1.turn = true;
  allPlayers.p2.turn = false;
  // allPlayers.p1.owns.splice(0);
  allPlayers.p1.owns = [];
  allPlayers.p2.owns = [];
  $(".game-square").children().remove();
  gameBoard.forEach(function(square) {
    square.owner = "";
  });
  return "p1";
}


$(document).ready(function() {
  $(".playerTurnName").text(allPlayers.p1.name);
  allPlayers.p1.turn = !allPlayers.p1.turn;
  var playerTurn = "p1";

  //click function for game squares
  $(".game-square").click(function() {
    var squareId = parseInt($(this).attr('id'));
    if (gameBoard[squareId].owner === "") {
      gameBoard[squareId].owner = allPlayers[playerTurn].symbol;
      $(this).append("<img src='img/image" + allPlayers[playerTurn].symbol + ".png' alt='" + allPlayers[playerTurn].symbol + " picture' height=200px>");
      allPlayers[playerTurn].owns.push(squareId);
      if (winCondition(playerTurn) === true) {
        //setTimeout to create delay before showing win alert.
        setTimeout(function(){
          alert(allPlayers[playerTurn].name + ' wins!');
          playerTurn = resetGame();
        },  500);

      } else {
        playerTurn = switchTurn();
      }
    } else {
      alert("This square is already owned!");
    }
  })

  //reset game button
  $("#resetGameButton").click(function() {
    playerTurn = resetGame();
  })

})
