function GetSafeMoves(gameData, possibleMoves) {
  var SafeMoves = [];
  //this is the snake body
  const MySnakeBodyObject = gameData["you"]["body"];
  //checker head details
  const SnakeHead = gameData["you"]["head"];

  const getBoardDetails = MySnakeBodyObject["board"];
  //wall of the snake is at x != 11 or y != 11
  // x !< 0 y !< 0

  // its a fact that head is what is leading the snake to any direction so head.x < 11 and head.y < 11 shoul;d d0
  possibleMoves.forEach((move) => {
    var GetCoordinates = getNextCoordinatesOfTheMove(SnakeHead, move);
    //analyze the board and other snakes
    if (
      avoidHittingTheWalls(
        GetCoordinates,
        getBoardDetails["height"],
        getBoardDetails["width"]
      ) &&
      avoidHittingTheOtherSnakes(GetCoordinates, getBoardDetails["snakes"])
    ) {
      SafeMoves.push(GetCoordinates);
    }
  });
  return SafeMoves;
}

function getNextCoordinatesOfTheMove(SnakeHead, move) {
  var futureHeadOfSnake = Object.assign({}, SnakeHead);
  if (move === "up") {
    futureHeadOfSnake.y = SnakeHead.y + 1;
  } else if (move === "down") {
    futureHeadOfSnake.y = SnakeHead.y - 1;
  } else if (move === "left") {
    futureHeadOfSnake.x = SnakeHead.x - 1;
  } else {
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
  return result;
}

module.exports = {
  GetSafeMoves,
};