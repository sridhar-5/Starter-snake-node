const bodyParser = require("body-parser");
const express = require("express");
const {
  getSafeMoves,
  GetSafeMoves,
} = require("./optimize-snake/Optimize-level-1");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", handleIndex);
app.post("/start", handleStart);
app.post("/move", handleMove);
app.post("/end", handleEnd);

app.listen(PORT, () =>
  console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`)
);

function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: "1",
    author: "sridhar-5",
    color: "#8000ff",
    head: "beluga",
    tail: "curled",
  };
  response.status(200).json(battlesnakeInfo);
}

function handleStart(request, response) {
  var gameData = request.body;

  console.log("START");
  response.status(200).send("ok");
}

function handleMove(request, response) {
  var gameData = request.body;
  console.log(gameData);
  var possibleMoves = ["up", "down", "left", "right"];

  //safe moves is a list => getsafeMoves returns a list of safe moves
  var SafeMoves = GetSafeMoves(gameData, possibleMoves);

  //if we get more than one safe mopve then we just select a move in random
  if (SafeMoves.length > 0) {
    var moveIndex = Math.floor(Math.random() * SafeMoves.length);
    var move = SafeMoves[moveIndex];
  } else {
    //if no safe moves are availble then return any random move
    moveIndex = Math.floor(Math.random() * possibleMoves.length);
    move = possibleMoves[moveIndex];
  }

  console.log("MOVE: " + move);
  response.status(200).send({
    move: move,
  });
}

function handleEnd(request, response) {
  var gameData = request.body;

  console.log("END");
  response.status(200).send("ok");
}
