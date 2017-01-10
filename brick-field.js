if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.BrickField = (function(Game) {
  "use strict";

  var settings = {
    brickColors: ["red", "orange", "yellow", "green", "blue", "purple"],
    brickHeight: 20,
    brickSpacing: 10,
    brickFieldBorder: 30
  };

  var bricks = [];

  function init(canvasWidth, canvasHeight, rows, columns) {
    settings.rows = rows || 6;
    settings.columns = columns || 10;

    var brickWidth = (canvasWidth - (columns * settings.brickSpacing) - (2 * settings.brickFieldBorder)) / columns;

    settings.brickWidth = brickWidth;

    bricks = createBricks();
  }

  function reset() {
    bricks = createBricks();
  }

  function draw() {
    var context = Game.getContext();

    // Draw all the bricks that haven't been hit.
    for (var col = 0; col < settings.columns; col++) {
      for (var row = 0; row < settings.rows; row++) {
        // Only draw the bricks that haven't been hit.
        if (!bricks[col][row].isHit) {
          drawBrick(context, bricks[col][row]);
        }
      }
    }
  }

  function handleCollisions(Ball) {
    for(var c = 0; c < settings.columns; c++) {
      for(var r = 0; r < settings.rows; r++) {
        var b = bricks[c][r];

        if(b.isHit == false) {
          if(Ball.getX() + Ball.ballRadius > b.x &&
             Ball.getX() - Ball.ballRadius < b.x + settings.brickWidth &&
             Ball.getY() + Ball.ballRadius > b.y &&
             Ball.getY() - Ball.ballRadius < b.y + settings.brickHeight) {

            Ball.collide();
            b.isHit = true;
            Game.hit();
          }
        }
      }
    }
  }

  function isCleared() {
    for (var col = 0; col < settings.columns; col++) {
      for (var row = 0; row < settings.rows; row++) {
        if(bricks[col][row].isHit == false) {
          return false;
        }
      }
    }

    return true;
  }

  function createBricks() {
    var brickField = [];

    for (var col = 0; col < settings.columns; col++) {
      var brickColumn = [];

      for (var row = 0; row < settings.rows; row++) {
        var coordinateX = col * (settings.brickWidth + settings.brickSpacing) + settings.brickFieldBorder;
        var coordinateY = row * (settings.brickHeight + settings.brickSpacing) + settings.brickFieldBorder;

        brickColumn.push({
          x: coordinateX,
          y: coordinateY,
          isHit: false,
          color: settings.brickColors[row % settings.brickColors.length]
        });
      }

      brickField.push(brickColumn);
    }

    return brickField;
  }

  function drawBrick(context, brick) {
    context.beginPath();
    context.rect(brick.x,
                 brick.y,
                 settings.brickWidth,
                 settings.brickHeight);
    context.fillStyle = brick.color;
    context.fill();
    context.closePath();
  }

  return {
    init: init,
    draw: draw,
    handleCollisions: handleCollisions,
    isCleared: isCleared,
    reset: reset
  };
})(window.Breakout.Game);
