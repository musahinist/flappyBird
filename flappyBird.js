let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");


// Load images and Audios
let bird = new Image();
let bg = new Image();

let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//some variables
let gap = 100;
let constant = pipeNorth.height + gap
let bX = 10;
let bY = 150;
let k = 20;
let gravity = 2;
let score = 0;

//Audio files
let fly = new Audio();
let inc_score = new Audio();

fly.src = "sounds/fly.mp3";
inc_score.src = "sounds/score.mp3"
// key control
document.addEventListener("keydown", moveUp);

function moveUp() {

    bY -= k;
    k += 1;
    fly.play();
}
//pipe coordinates
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}
document.addEventListener("keyup", () => k = 20)

// Draw images in canvas
pipeSouth.onload = function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;
        if (pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }
        //detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            location.reload();
        }
        if (pipe[i].x == 5) {
            score++;
            inc_score.play();
        }


    }
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, bX, bY);
    bY += gravity;
    //scoreboard
    ctx.fiilStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score:" + score, 5, cvs.height - 20)
    requestAnimationFrame(draw);
}