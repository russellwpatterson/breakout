if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.Ball = (function(Game) {
  "use strict";

  var settings = {
    ballRadius: 10,
    ballColor: "#FFFFFF",
    startingVelocityX: 5.0,
    startingVelocityY: -5.0,
    velocityChange: 0.5
  };

  var coordinates = {
    x: 0,
    y: 0
  };

  var velocity = {
    x: settings.startingVelocityX,
    y: settings.startingVelocityY
  };

  function init() {
    reset(true);
  }

  function draw() {
    updateLocation();

    var context = Game.getContext();
    context.beginPath();
    context.arc(coordinates.x, coordinates.y, settings.ballRadius, 0, Math.PI*2);
    context.fillStyle = settings.ballColor;
    context.fill();
    context.closePath();
  }

  function reset(isNewGame) {
    coordinates = {
      x: Game.getCanvas().width / 2,
      y: Game.getCanvas().height - 30
    };

    if (isNewGame) {
      velocity = {
        x: settings.startingVelocityX,
        y: settings.startingVelocityY
      };
    } else {
      velocity = {
        x: Math.abs(velocity.x),
        y: -Math.abs(velocity.y)
      };
    }
  }

  function getX() {
    return coordinates.x;
  }

  function getY() {
    return coordinates.y;
  }

  function collide() {
    velocity.y = -velocity.y;
  }

  function updateLocation() {
    var canvas = Game.getCanvas();

    if(coordinates.x + velocity.x > canvas.width - settings.ballRadius ||
       coordinates.x + velocity.x < settings.ballRadius) {
     // We've hit the left or right of the canvas. We should bounce.
     velocity.x = -velocity.x;
    }

    if(coordinates.y + velocity.y < settings.ballRadius) {
      // We've hit the top of the canvas. We should bounce.
      velocity.y = -velocity.y;
    }

    if(coordinates.y + velocity.y > canvas.height - settings.ballRadius) {
      // We didn't hit it with a paddle, so it went out of bounds.
      Game.outOfBounds(window.Breakout.Ball);
    }

    coordinates.x += velocity.x;
    coordinates.y += velocity.y;
  }

  return {
    init: init,
    draw: draw,
    reset: reset,
    getX: getX,
    getY: getY,
    collide: collide
  };
})(window.Breakout.Game);
