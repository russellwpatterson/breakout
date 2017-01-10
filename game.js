if (typeof window.Breakout === "undefined") {
  window.Breakout = {};
}

window.Breakout.Game = (function() {
  "use strict";

  var settings = {
    brickRows: 6,
    brickColumns: 10
  };

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

    window.Breakout.BrickField.draw();
    window.Breakout.Ball.draw();
    window.Breakout.Paddle.draw();

    // check for collisions
    if (window.Breakout.Paddle.isCollision()) {
      window.Breakout.Ball.collide();
    }

    window.Breakout.BrickField.handleCollisions(window.Breakout.Ball);

    // To continue drawing, request the next frame.
    window.requestAnimationFrame(run);
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function reset() {
    window.Breakout.Ball.reset(true);
    window.Breakout.BrickField.reset();
  }

  function getCanvas() {
    return canvas;
  }

  function getContext() {
    return context;
  }

  function outOfBounds(Ball) {
    // Reset the ball.
    Ball.reset();
  }

  function hit() {
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
    outOfBounds: outOfBounds,
    hit: hit
  };
})();
