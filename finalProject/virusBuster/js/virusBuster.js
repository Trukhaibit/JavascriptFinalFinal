var canvas = document.getElementById("myCanvas"); // Variables organized by usage
var ctx = canvas.getContext("2d");
var score = 0;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleImg = document.getElementById("paddle"); // Variables organized by usage
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var img = document.getElementById("virus"); // Variables organized by usage
var virusRowCount = 7;
var virusColumnCount = 5;
var virusWidth = 75;
var virusHeight = 20;
var virusPadding = 10;
var virusOffsetTop = 30;
var virusOffsetLeft = 30;
var virusX = (c * (virusWidth + virusPadding)) + virusOffsetLeft;
var virusY = (r * (virusHeight + virusPadding)) + virusOffsetTop;

var viruses = []; // Calculates the amount of viruses and how to display them
for(var c = 0; c < virusColumnCount; c++) {
	viruses[c] = [];
	for(var r = 0; r < virusRowCount; r++) {
		viruses[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler, false); // Controls
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(prs) {
	if(prs.key == "ArrowRight") {
		rightPressed = true;
	}
	else if(prs.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(prs) {
	if(prs.key == "ArrowRight") {
		rightPressed = false;
	}
	else if(prs.key == "ArrowLeft") {
		leftPressed = false;
	}
}
function virusCollision() { // Collision detection for when the ball hits a virus
    for(var c = 0; c < virusColumnCount; c++) { // Not for walls and floor that's later
        for(var r = 0; r < virusRowCount; r++) {
            var v = viruses[c][r];
            if(v.status == 1) { // V Score and Winning V
                if(x > v.x && x < v.x + virusWidth && y > v.y && y < v.y + virusHeight) {
                    dy = -dy;
                    v.status = 0;
                    score++;
					if(score == virusRowCount * virusColumnCount) {
                        alert("Conglaturation! A winner is you!"); // look up NES GhostBusters and NES Pro Wrestling
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() { // Drawing important objects
    ctx.font = "900 16px Orbitron";
    ctx.fillStyle = "#0000FF";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "0000FF";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.drawImage(paddleImg, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
}

function drawBricks() { // Drawing viruses by column, then by row
	for(var c = 0; c < virusColumnCount; c++) { // (as opposed to written english)
		for(var r = 0; r < virusRowCount; r++) { // (which is row, then column)
			if(viruses[c][r].status == 1) {
				var virusX = (c * (virusWidth + virusPadding)) + virusOffsetLeft;
				var virusY = (r * (virusHeight + virusPadding)) + virusOffsetTop;
				viruses[c][r].x = virusX;
				viruses[c][r].y = virusY;
				ctx.drawImage(img, virusX, virusY, virusWidth, virusHeight)
			}
		}
	}
}
function draw() { // Running the game
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();
	drawBricks();
	drawPaddle();
	drawScore();
	drawBall();
	virusCollision(); // V This is the wall and floor collision V
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height - ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy; // The ball doesn't actually touch the paddle
		} // It actually bounces off of the wall where the paddle is
		else { 
			alert("GAME OVER");
			document.location.reload();
			clearInterval(interval);
		}
	}
	if(rightPressed) { // Moves paddle in response to the controls
		paddleX += 7;
		if (paddleX + paddleWidth > canvas.width){
			paddleX = canvas.width - paddleWidth;
		}
	}
	else if(leftPressed) {
		paddleX -= 7;
		if (paddleX < 0){
			paddleX = 0;
			}
	}
	x = x + (dx * 2) // Moves the ball
	y += dy;
}
var interval = setInterval(draw, 10); // Framerate
