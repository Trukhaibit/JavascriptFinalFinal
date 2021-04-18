var canvas = document.getElementById("myCanvas"); // Variables organized by usage
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height / 2;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var scoreBottom = 0; // Variables organized by usage
var scoreTop = 0;

var paddleHeight = 10; // Variables organized by usage
var paddleWidth = 75;
var bottomImg = document.getElementById("paddleUser");
var topImg = document.getElementById("paddleAI");
var paddleBottomX = (canvas.width - paddleWidth) / 2;
var paddleTopX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var aPressed = false;
var dPressed = false;

document.addEventListener("keydown", keyDownHandler, false); // Controls
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(prs) {
	if(prs.key == "ArrowRight") {
		rightPressed = true;
	}
	else if(prs.key == "ArrowLeft") {
		leftPressed = true;
	}
	if(prs.key == "d") {
		dPressed = true;
	}
	else if(prs.key == "a") {
		aPressed = true;
	}
}

function keyUpHandler(prs) {
	if(prs.key == "ArrowRight") {
		rightPressed = false;
	}
	else if(prs.key == "ArrowLeft") {
		leftPressed = false;
	}
	if(prs.key == "d") {
		dPressed = false;
	}
	else if(prs.key == "a") {
		aPressed = false;
	}
}

function drawBall() { // Drawing important objects
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0000FF";
	ctx.fill();
	ctx.closePath();
}

function drawBottomPaddle() {
	ctx.drawImage(bottomImg, paddleBottomX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
}

function drawTopPaddle() {
	ctx.drawImage(topImg, paddleTopX, 0, paddleWidth, paddleHeight)
}
	
alert("First to 3 wins!"); // A little scuffed but I couldn't find a better place for it.
function draw() { // Running the game
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();
	drawBall();
	drawBottomPaddle();
	drawTopPaddle(); // V Ball and wall collision V
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy > canvas.height - ballRadius) {
		if(x > paddleBottomX && x < paddleBottomX + paddleWidth) {
			dy = -dy; // The ball doesn't actually touch either paddle
		}
		else {
			scoreTop += 1;
			if (scoreTop < 3) { // Scoring and winning
				alert("Point awarded to AI. " + scoreTop + "/" + scoreBottom);
				x = canvas.width / 2;
				y = canvas.height / 2;
			}
			else {
				alert("AI wins! " + scoreTop + "/" + scoreBottom);
				document.location.reload();
				clearInterval(interval);
			}
		}
	} else if(y + dy < ballRadius) {
		if(x > paddleTopX && x < paddleTopX + paddleWidth) {
			dy = -dy; // It actually bounces off of the wall where a paddle is
		}
		else {
			scoreBottom += 1;
			if (scoreBottom < 3) { // Scoring and winning
				alert("Point awarded to User. " + scoreTop + "/" + scoreBottom);
				x = canvas.width / 2;
				y = canvas.height / 2;
			}
			else {
				alert("User wins! " + scoreTop + "/" + scoreBottom);
				document.location.reload();
				clearInterval(interval);
			}
		}
	} 
	if(rightPressed) { // Moves paddles in response to the controls
		paddleBottomX += 7;
		if (paddleBottomX + paddleWidth > canvas.width){
			paddleBottomX = canvas.width - paddleWidth;
		}
	}
	else if(leftPressed) {
		paddleBottomX -= 7;
		if (paddleBottomX < 0){
			paddleBottomX = 0;
		}
	}
	if(dPressed) {
		paddleTopX += 7;
		if (paddleTopX + paddleWidth > canvas.width){
			paddleTopX = canvas.width - paddleWidth;
		}
	}
	else if(aPressed) {
		paddleTopX -= 7;
		if (paddleTopX < 0){
			paddleTopX = 0;
		}
	}
	x = x + (dx * 2) // Moves the ball
	y += dy;
}
var interval = setInterval(draw, 10); // Framerate
