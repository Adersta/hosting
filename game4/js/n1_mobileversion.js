var w = 1280;
var h = 720;
var choise = 0;
var respuestas = [1,1,1,1];
let preg = [];
var PlayerAnswer = null;
let resa = [];
let resb = [];
let resc = [];
let resd = [];
let rese = [];
var pregResueltas = [];
var ball;
var paddle;
var bricks;
var ballOnPaddle = true;
var lives = 3;
var score = 0;
var scoreText;
var livesText;
var introText;
var s;
var NumBlockDestroy = 0;
var totalBricks = 0;
var removed1;			
var removed2;
var gameov;
var paddle_sound;	
var brick_sound;
var gameFisnish = false;
var RanQuest2 = 0;
var contestando = false;

var n1={
   preload:function () 
{
    game.add.text(0, 0, "hack", {font:"1px roboto", fill:"#FFFFFF"});
	game.scale.setGameSize(w/2, h/2);
	game.load.image('background', 'assets/background.png');
	game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
	game.load.image('GameOver', 'assets/gameover.png');
	game.load.image('brick', 'assets/brick.png');
	game.load.image('paddle', 'assets/paddle.png');
	game.load.image('ball', 'assets/ball.png');
    game.load.image('pregunta0', 'assets/pregunta1.png');
	game.load.image('pregunta1', 'assets/pregunta2.png');
	game.load.image('pregunta2', 'assets/pregunta3.png');
	game.load.image('pregunta3', 'assets/pregunta4.png');
	game.load.spritesheet('fullscreenboton', 'assets/fullscreen.png',128,128);
    game.load.audio('music', 'assets/music.ogg');
    game.load.audio('bricksound', 'assets/brick.mp3');
    game.load.audio('paddlesound', 'assets/paddle.mp3');
    game.load.image('res0a', 'assets/RES0A.png');
	game.load.image('res0b', 'assets/RES0B.png');
	game.load.image('res0c', 'assets/RES0C.png');
	game.load.image('res0d', 'assets/RES0D.png');
    game.load.image('res0e', 'assets/RES0E.png');
    game.load.image('res1a', 'assets/RES1A.png');
	game.load.image('res1b', 'assets/RES1B.png');
	game.load.image('res1c', 'assets/RES1C.png');
	game.load.image('res1d', 'assets/RES1D.png');
    game.load.image('res1e', 'assets/RES1E.png');
    game.load.image('res2a', 'assets/RES2A.png');
	game.load.image('res2b', 'assets/RES2B.png');
	game.load.image('res2c', 'assets/RES2C.png');
	game.load.image('res2d', 'assets/RES2D.png');
    game.load.image('res2e', 'assets/RES2E.png');
    game.load.image('res3a', 'assets/RES3A.png');
	game.load.image('res3b', 'assets/RES3B.png');
	game.load.image('res3c', 'assets/RES3C.png');
	game.load.image('res3d', 'assets/RES3D.png');
    game.load.image('res3e', 'assets/RES3E.png');
}
,

create:function () 
{
    var music = game.add.audio('music');
    music.play();  
    music.loopFull(1.1); 
    music.volume = 0.09;
    paddle_sound = game.add.audio('bricksound');
    brick_sound = game.add.audio('paddlesound'); 
	//BACKGROUND
	var background = game.add.sprite(0, 0, 'background');
	background.fixedToCamera = true;
    background.scale.setTo(0.5,0.5);
    //PHYSICS
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    //ELEMENTS
    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;
    var brick;
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(40 + (x * 36), 10 + (y * 52), 'brick');
            totalBricks = totalBricks+1;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }
    paddle = game.add.sprite(game.world.centerX, game.world.centerY+100, 'paddle');
    paddle.anchor.setTo(0.5, 0.5);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;
    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'ball');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.events.onOutOfBounds.add(ballLost, this);
    //START
    let preg0 = game.add.image(0, 0, 'pregunta0');
    preg.push(preg0);
    let preg1 = game.add.image(0, 0, 'pregunta1');
    preg.push(preg1);
    let preg2 = game.add.image(0, 0, 'pregunta2');
    preg.push(preg2);
    let preg3 = game.add.image(0, 0, 'pregunta3');
    preg.push(preg3);
    for(i=0 ;i < preg.length ;i++ ){
        preg[i].fixedToCamera = true;
        preg[i].visible = 0;
    }
       //RESA
let res0a = game.add.button(100, 100, 'res0a',this.Afunction, this,2, 1, 0);
resa.push(res0a);
let res1a = game.add.button(100, 100, 'res1a',this.Afunction, this,2, 1, 0);
resa.push(res1a);
let res2a = game.add.button(100, 100, 'res2a', this.Afunction, this,2, 1, 0);
resa.push(res2a);
let res3a = game.add.button(100, 100, 'res3a', this.Afunction, this,2, 1, 0);
resa.push(res3a);
for(i=0 ;i < resa.length ;i++ ){
    resa[i].fixedToCamera = true;
    resa[i].visible = 0;
    resa[i].scale.setTo(0.5,0.5);
}
//RESB
let res0b = game.add.button(100, 150, 'res0b',this.Bfunction, this,2, 1, 0);
resb.push(res0b);
let res1b = game.add.button(100, 150, 'res1b',this.Bfunction, this,2, 1, 0);
resb.push(res1b);
let res2b = game.add.button(100, 150, 'res2b',this.Bfunction, this,2, 1, 0);
resb.push(res2b);
let res3b = game.add.button(100, 150, 'res3b',this.Bfunction, this,2, 1, 0);
resb.push(res3b);
for(i=0 ;i < resb.length ;i++ ){
    resb[i].fixedToCamera = true;
    resb[i].visible = 0;
    resb[i].scale.setTo(0.5,0.5);
}
//RESC
let res0c = game.add.button(100, 200, 'res0c',this.Cfunction, this,2, 1, 0);
resc.push(res0c);
let res1c = game.add.button(100, 200, 'res1c',this.Cfunction, this,2, 1, 0);
resc.push(res1c);
let res2c = game.add.button(100, 200, 'res2c',this.Cfunction, this,2, 1, 0);
resc.push(res2c);
let res3c = game.add.button(100, 200, 'res3c',this.Cfunction, this,2, 1, 0);
resc.push(res3c);
for(i=0 ;i < resc.length ;i++ ){
    resc[i].fixedToCamera = true;
    resc[i].visible = 0;
    resc[i].scale.setTo(0.5,0.5);
}
//RESD
let res0d = game.add.button(100, 250, 'res0d',this.Dfunction, this,2, 1, 0);
resd.push(res0d);
let res1d = game.add.button(100, 250, 'res1d',this.Dfunction, this,2, 1, 0);
resd.push(res1d);
let res2d = game.add.button(100, 250, 'res2d',this.Dfunction, this,2, 1, 0);
resd.push(res2d);
let res3d = game.add.button(100, 250, 'res3d',this.Dfunction, this,2, 1, 0);
resd.push(res3d);
for(i=0 ;i < resd.length ;i++ ){
    resd[i].fixedToCamera = true;
    resd[i].visible = 0;
    resd[i].scale.setTo(0.5,0.5);
}
//RESE
let res0e = game.add.button(100, 300, 'res0e',this.Efunction, this,2, 1, 0);
rese.push(res0e);
let res1e = game.add.button(100, 300, 'res1e',this.Efunction, this,2, 1, 0);
rese.push(res1e);
let res2e = game.add.button(100, 300, 'res2e',this.Efunction, this,2, 1, 0);
rese.push(res2e);
let res3e = game.add.button(100, 300, 'res3e',this.Efunction, this,2, 1, 0);
rese.push(res3e);
for(i=0 ;i < rese.length ;i++ ){
    rese[i].fixedToCamera = true;
    rese[i].visible = 0;
    rese[i].scale.setTo(0.5,0.5);
}
    //UI
    scoreText = game.add.text(32, h/2 -25, 'score: 0', { font: "20px roboto", fill: "#ffffff", align: "left" });
    livesText = game.add.text(500, h/2 -25, 'lives: 3', { font: "20px roboto", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 100, '- click to start -', { font: "40px roboto", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);
    game.input.onDown.add(releaseBall, this);
    var fullscreenboton = game.add.button(10, 10, 'fullscreenboton', this.fullscreenfunction, this,2, 1, 0);
	fullscreenboton.fixedToCamera = true;
}
,

update:function () 
{
    scoreText.text = 'score: ' + score;
    if(NumBlockDestroy >= (totalBricks/preg.length -1) ){
        if(contestando == false ){
            RanQuest2 = Math.floor(Math.random() * preg.length);
            for(var i = 0; i < pregResueltas.length ; i++){            
                if(RanQuest2 === pregResueltas[i]) {
                    console.log("rerun")
                    RanQuest2 = Math.floor(Math.random() * preg.length);
                    i = -1;
                }
            }
        }
       this.quest(RanQuest2);
    }
    paddle.x = game.input.x;
    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }
}
,

Afunction:function() {
    PlayerAnswer = 1;
},
Bfunction:function() {
    PlayerAnswer = 2;
},
Cfunction:function () {
    PlayerAnswer = 3;
},
Dfunction:function () {
    PlayerAnswer = 4;
},
Efunction:function () {
    PlayerAnswer = 5;
},

fullscreenfunction:function () {	
	if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
}
,
quest:function(RanQuest){  
    contestando = true;    
    ball.body.velocity.y = 0;
    ball.body.velocity.x = 0;
    preg[RanQuest].visible = 1;
    preg[RanQuest].scale.setTo(0.5,0.5);
    if(resa[RanQuest].visible == 1){}
    else{resa[RanQuest].visible = 1;}
    if(resb[RanQuest].visible == 1){}
    else{resb[RanQuest].visible = 1; }
    if(resc[RanQuest].visible == 1){ }
    else{resc[RanQuest].visible = 1;}
    if(resd[RanQuest].visible == 1){}
    else{ resd[RanQuest].visible = 1;}
    if(rese[RanQuest].visible == 1){}
    else{rese[RanQuest].visible = 1;}
    if(PlayerAnswer == respuestas[RanQuest]){
        pregResueltas.push(RanQuest);
        preg[RanQuest].visible = 0;	
        resa[RanQuest].visible = 0;
        resb[RanQuest].visible = 0;
        resc[RanQuest].visible = 0;
        resd[RanQuest].visible = 0;
        rese[RanQuest].visible = 0;
        choise = 0;
        score = score + 100;
        contestando = false;
        PlayerAnswer = null;
        NumBlockDestroy = 0; 
        ball.reset(paddle.body.x + 16, paddle.y - 16);
        ball.body.velocity.y = -100;
        ball.body.velocity.x = -10;
    }
    else if(PlayerAnswer != respuestas[RanQuest] && PlayerAnswer != null){
        pregResueltas.push(RanQuest);
        preg[RanQuest].visible = 0;	
        resa[RanQuest].visible = 0;
        resb[RanQuest].visible = 0;
        resc[RanQuest].visible = 0;
        resd[RanQuest].visible = 0;
        rese[RanQuest].visible = 0;
        choise = 0;
        score = score + 0;
        contestando = false;
        PlayerAnswer = null;
        NumBlockDestroy = 0; 
        game.input.onDown.add(releaseBall, this);
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
    }	
}
}
function releaseBall () {
    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -100;
        ball.body.velocity.x = -10;
        ball.animations.play('spin');
        introText.visible = false;
    }
}

function ballLost () {
    lives--;
    livesText.text = 'lives: ' + lives;
    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;
        ball.reset(paddle.body.x + 16, paddle.y - 16);
        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);
    var background = game.add.sprite(0, 0, 'GameOver');
    background.scale.setTo(0.5,0.5);
	background.fixedToCamera = true;   
    introText.text = 'Game Over!';
    introText.visible = true;
    if(gameFisnish == false){
        //  New level starts
        NumBlockDestroy = 0;
        score = 0;
        lives = 3;
        livesText.text = 'lives: ' + lives;
        scoreText.text = 'score: ' + score;
        introText.text = 'Has perdido, vuelve a intentarlo';
        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
        background.destroy();
    }
    if(gameFisnish == true){
        localStorage.setItem("CompleteGame","Aprovado");
        introText.text = 'Game Over!';
        var context = game.add.text(w/2 -400, 50, 'Juego Terminado, presiona el boton continuar para \n pasar a la siguiente diapositiva', { font: "20px roboto", fill: "#ffffff", align: "left" });
        context.anchor.setTo(0.5, 0.5);
        var context2 = game.add.text(w/2 -450, h/2 -50, 'Music:https://patrickdearteaga.com \n sounds:Sound from Zapsplat.com', { font: "20px roboto", fill: "#ffffff", align: "left" });
        context2.anchor.setTo(0.5, 0.5);
    }
}

function ballHitBrick (ball, brick) {
    brick_sound.play();
    brick.kill();
    NumBlockDestroy = NumBlockDestroy + 1;
    score += 10;
    scoreText.text = 'score: ' + score;
    if (bricks.countLiving() == 0)
    {
        gameFisnish = true;
        gameOver();
    }

}

function ballHitPaddle (ball, paddle) {
    paddle_sound.play();  
    var diff = 0;

    if (ball.x < paddle.x)
    {
        diff = paddle.x - ball.x;
        ball.body.velocity.x = (-10 * diff);
    }
    else if (ball.x > paddle.x)
    {
        diff = ball.x -paddle.x;
        ball.body.velocity.x = (10 * diff);
    }
    else
    {
        ball.body.velocity.x = 2 + Math.random() * 8;
    }

}