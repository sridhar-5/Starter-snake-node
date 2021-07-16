function AvoidHittingSelfBody(nextMove, bodyObject) {
  // the next move here is the head position in the next move
  //so if the head is in the body of next move then snake would run into itself
  var result = true;
  bodyObject.forEach((coordinate) => {
    if (JSON.stringify(nextMove) == JSON.stringify(coordinate)) {
      result = false;
      return result;
    }
  });
  return result;
}

function CheckSnakeHeadNotInBody(GetCoordinates, SnakeBodyExceptTail) {
  SnakeBodyExceptTail.forEach((bodyCoordinate) => {
    if (JSON.stringify(bodyCoordinate) == JSON.stringify(GetCoordinates)) {
      return false;
    }
  });
  return true;
}
module.exports = {
  AvoidHittingSelfBody,
  CheckSnakeHeadNotInBody,
};
