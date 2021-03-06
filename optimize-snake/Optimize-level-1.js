const {
  AvoidHittingSelfBody,
  CheckSnakeHeadNotInBody,
} = require("./AvoidHittingSelfBody");

function GetSafeMoves(gameData, possibleMoves) {
  var SafeMoves = [];
  //this is the snake body
  const OurSnakeBody = gameData["you"]["body"];
  //checker head details
  const SnakeHead = gameData["you"]["head"];

  const getBoardDetails = gameData["board"];
  //wall of the snake is at x != 11 or y != 11
  // x !< 0 y !< 0

  // its a fact that head is what is leading the snake to any direction so head.x < 11 and head.y < 11 shoul;d d0
  possibleMoves.forEach((move) => {
    var GetCoordinates = getNextCoordinatesOfTheMove(SnakeHead, move);
    var SnakeTail = OurSnakeBody[OurSnakeBody.length - 1];
    var SnakeBodyExceptTail = OurSnakeBody.slice(0, OurSnakeBody.length - 2);
    //analyze the board and other snakes
    if (
      avoidHittingTheWalls(
        GetCoordinates,
        getBoardDetails["height"],
        getBoardDetails["width"]
      ) &&
      avoidHittingTheOtherSnakes(GetCoordinates, getBoardDetails["snakes"]) &&
      AvoidHittingSelfBody(GetCoordinates, OurSnakeBody)
    ) {
      SafeMoves.push(move);
    } else if (
      OurSnakeBody.length > 1 &&
      JSON.stringify(GetCoordinates) == JSON.stringify(SnakeTail) &&
      CheckSnakeHeadNotInBody(GetCoordinates, SnakeBodyExceptTail)
    ) {
      console.log("called elseif boundary");
      SafeMoves.push(move);
      console.log(
        "head.x, head.y, tail.x, tail.y",
        GetCoordinates.x,
        GetCoordinates.y,
        SnakeTail.x,
        SnakeTail.y
      );
    }
  });
  return SafeMoves;
}

function getNextCoordinatesOfTheMove(SnakeHead, move) {
  var futureHeadOfSnake = Object.assign({}, SnakeHead);
  if (move == "up") {
    futureHeadOfSnake.y = SnakeHead.y + 1;
  }
  if (move == "down") {
    futureHeadOfSnake.y = SnakeHead.y - 1;
  }
  if (move == "left") {
    futureHeadOfSnake.x = SnakeHead.x - 1;
  }
  if (move == "right") {
    futureHeadOfSnake.x = SnakeHead.x + 1;
  }
  return futureHeadOfSnake;
}

function avoidHittingTheWalls(HeadCoordinates, height, width) {
  var result = true;
  if (
    HeadCoordinates.x < 0 ||
    HeadCoordinates.y < 0 ||
    HeadCoordinates.x >= width ||
    HeadCoordinates.y >= height
  ) {
    result = false;
  } else {
    result = true;
  }

  return result;
}

function avoidHittingTheOtherSnakes(HeadCoordinates, AllSnakeDetails) {
  var result2 = true;
  AllSnakeDetails.forEach((snake) => {
    if (HeadCoordinates in snake.body) {
      result2 = false;
    }
  });
  return result2;
}

module.exports = {
  GetSafeMoves,
};
