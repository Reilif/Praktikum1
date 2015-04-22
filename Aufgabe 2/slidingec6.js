"use strict";
var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', drawTiles, false);

<!-- Destructing Assignment-->

var [solved, [boardSize, tileCount]] = [false, [document.getElementById('puzzle').width, document.getElementById('scale').value]];
var tileSize = boardSize / tileCount;


<!-- Classes-->
class Loc {

    <!-- Default-Werte-->
    <!-- Numeric Literal-->

    constructor(x = 0b0, y = 0o0) {
        this.x = x;
        this.y = y;
    }
}

var clickLoc = new Loc();

var pos = [0,0];

<!-- Spread -->
var emptyLoc = new Loc(...pos);

var boardParts;

<!-- Arrow-Funktion -->
const setBoard = () =>{
    boardParts = new Array(tileCount);
    for (let i = 0; i < tileCount; ++i) {
        boardParts[i] = new Array(tileCount);
        for (let j = 0; j < tileCount; ++j) {
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (tileCount - 1) - i;
            boardParts[i][j].y = (tileCount - 1) - j;
        }
    }
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
};


setBoard();

document.getElementById('scale').onchange = function () {
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    setBoard();
    drawTiles();
};

<!-- Promise -->
function timeout(ms) {
    return new Promise((resolve) => {
            setTimeout(resolve, ms);
    });
}


document.getElementById('puzzle').onclick = function (e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
        slideTile(emptyLoc, clickLoc);
        drawTiles();
    }
    if (solved) {
        timeout(500).then(() => {
            alert("You solved it!");
        });
    }
};


<!-- Arrow-Funktion -->
var drawTiles = () =>{

    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            var x = boardParts[i][j].x;
            var y = boardParts[i][j].y;
            if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
                    i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
}
;

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
    if (!solved) {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}

function checkSolved() {
    let flag = true;
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
                flag = false;
            }
        }
    }
    solved = flag;
}
