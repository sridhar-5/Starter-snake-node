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
  //if the head coordinates of the snake is somewhere inside the same snakes
  //body then that might be considered as a self collision position
  //head is also the [part] of snakes body but head in snakes body is not a safe place to move to.
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
