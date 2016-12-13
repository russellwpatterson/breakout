if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.Game = (function() {
  "use strict";

  var settings = {
    maxLives: 3
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
    currentLives = maxLives;
    Ball.reset(true);
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
