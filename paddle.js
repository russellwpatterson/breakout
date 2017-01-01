if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.Paddle = (function(Game, Ball) {
  "use strict";

  var settings = {
    paddleColor: "#FFFFFF",
    paddleWidth: 75,
    paddleHeight: 10,
    paddleMovementSpeed: 7
  };

  var coordinateX = 0;

  var isMovingLeft = false;
  var isMovingRight = false;

  function init() {
    coordinateX = (Game.getCanvas().width - settings.paddleWidth) / 2;
    setupEvents();
  }

  function draw() {
    updateLocation();

    var canvas = Game.getCanvas();
    var context = Game.getContext();

    context.beginPath();
    context.rect(coordinateX,
                 canvas.height - settings.paddleHeight,
                 settings.paddleWidth,
                 settings.paddleHeight);
    context.fillStyle = settings.paddleColor;
    context.fill();
    context.closePath();
  }

  function reset() {
    coordinateX = (Game.getCanvas().width - paddleWidth) / 2;
    isMovingLeft = false;
    isMovingRight = false;
  }

  function getLocation() {
    return coordinateX;
  }

  function updateLocation() {
    if (isMovingLeft && coordinateX > 0) {
      if (coordinateX < settings.paddleMovementSpeed) {
        coordinateX = 0;
      } else {
        coordinateX -= settings.paddleMovementSpeed;
      }
    } else {
      var rightBound = Game.getCanvas().width - settings.paddleWidth;

      if(isMovingRight && coordinateX < rightBound) {
        if (coordinateX + settings.paddleMovementSpeed > rightBound) {
          coordinateX = rightBound;
        } else {
          coordinateX += settings.paddleMovementSpeed;
        }
      }
    }
  }

  function isCollision() {

    if (Ball.getY() + Ball.ballRadius < Game.getCanvas().height - settings.paddleHeight) {
      // If the ball isn't at a place where it could be touching the paddle,
      // it's definitely not.
      return false;
    }
    //
    // if (Ball.getY() != Game.getCanvas().height - settings.paddleHeight) {
    //   // If the ball isn't at a place where it could be touching the paddle,
    //   // it's definitely not.
    //   return false;
    // }

    if (Ball.getX() + Ball.ballRadius > coordinateX &&
        Ball.getX() - Ball.ballRadius < coordinateX + settings.paddleWidth) {
      // If the ball is at a place where it could be touching the paddle,
      // it needs to be within the width of the paddle.
      return true;
    }

    // If we get here, we're not touching the paddle for sure.
    return false;
  }

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      // Right Arrow Pressed
      isMovingRight = true;
    }
    else if (e.keyCode == 37) {
      // Left Arrow Pressed
      isMovingLeft = true;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39) {
      // Right Arrow Released
      isMovingRight = false;
    }
    else if(e.keyCode == 37) {
      // Left Arrow Released
      isMovingLeft = false;
    }
  }

  function mouseMoveHandler(e) {
    var canvas = Game.getCanvas();
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      coordinateX = relativeX - settings.paddleWidth / 2;
    }
  }

  function setupEvents() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
  }

  return {
    init: init,
    draw: draw,
    getLocation: getLocation,
    isCollision: isCollision,
    reset: reset
  };
})(window.Breakout.Game, window.Breakout.Ball);
