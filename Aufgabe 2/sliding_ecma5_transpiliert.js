var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width;
var tileCount = document.getElementById('scale').value;

var tileSize = boardSize / tileCount;

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Loc = function Loc(x, y) {
  _classCallCheck(this, Loc);

  this.x = x;
  this.y = y;
};

var clickLoc = new Loc(0, 0);
var emptyLoc = new Loc(0, 0);


var solved = false;

var boardParts;
setBoard();

document.getElementById('scale').onchange = function() {
  tileCount = this.value;
  tileSize = boardSize / tileCount;
  setBoard();
  drawTiles();
};

document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {
      alert("You solved it!");
    }, 500);
    return {};
  }
};

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() {
  context.clearRect(0, 0, boardSize, boardSize);
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize, i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

function distance() {
  for (var arg = [],
           $__0 = 0; $__0 < arguments.length; $__0++)
    arg[$__0] = arguments[$__0];
  return Math.abs(arg[0] - arg[2]) + Math.abs(arg[1] - arg[3]);
}

function slideTile() {
  for (var arg = [],
           $__0 = 0; $__0 < arguments.length; $__0++)
    arg[$__0] = arguments[$__0];
  if (!solved) {
    boardParts[arg[0].x][arg[0].y].x = boardParts[arg[1].x][arg[1].y].x;
    boardParts[arg[0].x][arg[0].y].y = boardParts[arg[1].x][arg[1].y].y;
    boardParts[arg[1].x][arg[1].y].x = tileCount - 1;
    boardParts[arg[1].x][arg[1].y].y = tileCount - 1;
    arg[0].x = arg[1].x;
    arg[0].y = arg[1].y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
