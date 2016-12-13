if (typeof window.Breakout == "undefined") {
  window.Breakout = {};
}

window.Breakout.BrickField = (function(Game) {
  "use strict";

  var settings = {
    brickColors: ["red", "orange", "yellow", "green", "blue", "purple"],
    rows: 6,
    columns: 10,
    brickHeight: 20,
    brickWidth: 75,
    brickSpacing: 30,
    brickPadding: 10
  };

  var bricks = createBricks();

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
          if(Ball.getX() > b.x &&
             Ball.getX() < b.x + settings.brickWidth &&
             Ball.getY() > b.y &&
             Ball.getY() < b.y + settings.brickHeight) {

            Ball.collide();
            b.isHit = true;
            Game.hit();
          }
        }
      }
    }
  }

  function createBricks() {
    var brickField = [];

    for (var col = 0; col < settings.columns; col++) {
      var brickColumn = [];

      for (var row = 0; row < settings.rows; row++) {
        var coordinateX = (col * (settings.brickWidth + settings.brickPadding)) + settings.brickSpacing;
        var coordinateY = (row * (settings.brickHeight + settings.brickPadding)) + settings.brickSpacing;

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
    draw: draw,
    handleCollisions: handleCollisions
  };
})(window.Breakout.Game);
