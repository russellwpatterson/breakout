if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.Game = (function() {
  "use strict";

  var settings = {
    maxLives: 3,
    brickRows: 6,
    brickColumns: 10
  };

  var currentScore = 0;
  var currentLives = 0;

  var canvas = null;
  var context = null;

  function init() {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    context.scale(1,1);

    window.Breakout.Ball.init();
    window.Breakout.Paddle.init();
    window.Breakout.BrickField.init(canvas.width, canvas.height, settings.brickRows, settings.brickColumns);

    window.requestAnimationFrame(run);
  }

  function run() {
    clearCanvas();
    // do all the things here.
    // draw all the things
    window.Breakout.BrickField.draw();
    window.Breakout.Ball.draw();
    window.Breakout.Paddle.draw();
    // check for collisions

    if (window.Breakout.Paddle.isCollision()) {
      window.Breakout.Ball.collide();
    }

    window.Breakout.BrickField.handleCollisions(window.Breakout.Ball);

    // To continue drawing.
    window.requestAnimationFrame(run);
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function reset() {
    currentScore = 0;
    currentLives = settings.maxLives;

    window.Breakout.Ball.reset(true);
    window.Breakout.BrickField.reset();
  }

  function getCanvas() {
    return canvas;
  }

  function getContext() {
    return context;
  }

  function getCurrentScore() {
    return currentScore;
  }

  function getCurrentLives() {
    return currentLives;
  }

  function outOfBounds(Ball) {
    if (--currentLives == 0) {
      // TODO: Display a message?
      reset();
    }
    else {
      // Reset the ball.
      Ball.reset();
    }
  }

  function hit() {
    currentScore++;

    // is level over?
    if(window.Breakout.BrickField.isCleared()) {
      alert("Congratulations! You've cleared the level!");
      reset();
    }
  }

  return {
    init: init,
    getCanvas: getCanvas,
    getContext: getContext,
    getCurrentScore: getCurrentScore,
    getCurrentLives: getCurrentLives,
    outOfBounds: outOfBounds,
    hit: hit
  };
})();
