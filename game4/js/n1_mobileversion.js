var w = 1280;
var h = 720;
var choise = 0;
var respuestas = ["A","A","A","A","A"];
let preg = [];
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
    game.load.image('pregunta0', 'assets/pregunta1mobile.png');
	game.load.image('pregunta1', 'assets/pregunta2mobile.png');
	game.load.image('pregunta2', 'assets/pregunta3mobile.png');
	game.load.image('pregunta3', 'assets/pregunta4mobile.png');
	game.load.image('pregunta4', 'assets/pregunta5mobile.png');
	game.load.spritesheet('fullscreenboton', 'assets/fullscreen.png',128,128);
    game.load.audio('music', 'assets/music.ogg');
    game.load.audio('bricksound', 'assets/brick.mp3');
    game.load.audio('paddlesound', 'assets/paddle.mp3');
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
    let preg4 = game.add.image(0, 0, 'pregunta4');
    preg.push(preg4);
    for(i=0 ;i < preg.length ;i++ ){
        preg[i].fixedToCamera = true;
        preg[i].visible = 0;
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
    if(NumBlockDestroy > (totalBricks/5) ){
        this.quest();
        NumBlockDestroy = 0;
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

quest:function(){

	let RanQuest = Math.floor(Math.random() * preg.length);
	game.paused = true;
    preg[RanQuest].visible = 1;
	menu = game.add.sprite(w/4, h/4 + -100, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	menu.fixedToCamera = true;
	game.input.onDown.add(unpause, self);	
	function unpause(event){
		if(game.paused){		
			var x1 = w/4 - 270/2 , x2 = w/4 + 270/2,
				y1 = h/4 - 180/2 + -100, y2 = h/4 + 180/2;
			if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
				var choisemap = ['A', '2', 'B', '4', 'C', 'six'];
				var x = event.x - x1,
					y = event.y - y1;
				choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
				if(choisemap[choise] == respuestas[RanQuest]){
                    preg[RanQuest].visible = 0;	
					menu.destroy();
					choise = 0;
					score = score + 100;
                    removed1 = preg.splice(RanQuest,1);
					removed1 = null;				
					removed2 = respuestas.splice(RanQuest,1);
					removed2 = null;
					game.paused = false;
                    RanQuest = null;
				}
			}
		}
	};
}


}

function releaseBall () {
    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        //ball.body.velocity.y = -300;
        ball.body.velocity.y = -100;
        //ball.body.velocity.x = -75;
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
        introText.text = 'Game Over!';
        var context = game.add.text(w/2, 50, 'Juego Terminado, presiona el boton continuar para \n pasar a la siguiente diapositiva', { font: "40px roboto", fill: "#ffffff", align: "left" });
        context.anchor.setTo(0.5, 0.5);
        var context2 = game.add.text(w/2, h -100, 'Music:https://patrickdearteaga.com \n sounds:Sound from Zapsplat.com', { font: "30px roboto", fill: "#ffffff", align: "left" });
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
