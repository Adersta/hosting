var w = 1280;
var h = 720;
var choise = 0;
let preguntas = ["pregunta 1","pregunta 2","pregunta 3","pregunta 4","pregunta 5"];
let contextPreguntas = ["contexto 1","contexto 2","contexto 3","contexto 4","contexto 5"];
var respuestas = ["A","A","A","A","A","A","A","A"];

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


var n1={
   preload:function () 
{
	game.load.image('puntero', 'assets/puntero.png');
	game.load.image('greenarea', 'assets/greenarea.png');
	game.load.image('atari2', 'assets/doll.png');
	game.load.image('powerbar', 'assets/powerbar.jpg');
	game.load.image('background', 'assets/background.jpg');
	game.load.video('video', 'assets/video.mp4');
	game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
	game.load.spritesheet('continuebutton', 'assets/button-round-a.png',96,96);
	game.load.image('GameOver', 'assets/gameover.jpg');

	game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    game.load.image('starfield', 'assets/misc/starfield.jpg');

	game.load.image('brick', 'assets/brick.jpg');
	game.load.image('paddle', 'assets/paddle.jpg');
	game.load.image('ball', 'assets/ball.jpg');

    game.load.image('pregunta0', 'assets/pregunta1.png');
			game.load.image('pregunta1', 'assets/pregunta2.png');
			game.load.image('pregunta2', 'assets/pregunta3.png');
			game.load.image('pregunta3', 'assets/pregunta4.png');
			game.load.image('pregunta4', 'assets/pregunta5.png');

}
,

create:function () 
{
	//BACKGROUND
	var background = game.add.sprite(0, 0, 'background');
	background.fixedToCamera = true;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    //s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(350 + (x * 36), 100 + (y * 52), 'brick');
            totalBricks = totalBricks+1;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
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

    //ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    ball.events.onOutOfBounds.add(ballLost, this);

    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);
}
,

update:function () 
{
    console.log('bricks . '+totalBricks)
    if(NumBlockDestroy > (totalBricks/5) ){
        this.quest();
        NumBlockDestroy = 0;
    }
	//  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

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

quest:function(){

	//let RanQuest = Math.floor(Math.random() * preguntas.length);
	let RanQuest = Math.floor(Math.random() * 4);

	// When the paus button is pressed, we pause the game
	game.paused = true;

	preguntaimg = game.add.sprite(0, 0, 'pregunta'+RanQuest);
	preguntaimg.fixedToCamera = true;
	
	// Then add the menu
	menu = game.add.sprite(w/2, h/2+240, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	menu.fixedToCamera = true;

	// And a label to illustrate which menu item was chosen. (This is not necessary)
	choiseLabel = game.add.text(w/2, h-600, ''+preguntas[RanQuest], { font: '30px Arial', fill: '#fff' });
	choiseLabel.anchor.setTo(0.5, 0.5);
	choiseLabel.fixedToCamera = true;

	contextlabel = game.add.text(w/2, h-500, ''+contextPreguntas[RanQuest], { font: '30px Arial', fill: '#fff' });
	contextlabel.anchor.setTo(0.5, 0.5);
	contextlabel.fixedToCamera = true;
	
	// Add a input listener that can help us return from being paused
	game.input.onDown.add(unpause, self);
	
	// And finally the method that handels the pause menu
	function unpause(event){
		// Only act if paused
		if(game.paused){
			// Calculate the corners of the menu
			var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
				y1 = h/2 - 180/2 + 240, y2 = h/2 + 180/2 +240;

			// Check if the click was inside the menu
			if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
				// The choicemap is an array that will help us see which item was clicked
				var choisemap = ['A', '2', 'B', '4', 'C', 'six'];

				// Get menu local coordinates for the click
				var x = event.x - x1,
					y = event.y - y1;

				// Calculate the choice 
				 choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
				 
				console.log("choise_ " + choisemap[choise]);

				// Display the choice
				choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
				if(choisemap[choise] == respuestas[RanQuest]){
					// Remove the menu and the label
					menu.destroy();
					preguntaimg.destroy();
					choiseLabel.destroy();
					contextlabel.destroy();
					//respuestas.remove(RanQuest);
					
					choise = 0;
					score = score + 1;
	
					// Unpause the game
					game.paused = false;

					//preguntas.remove(RanQuest);
					var removed = preguntas.splice(RanQuest,1);
					var removed = null;				
					var removed = respuestas.splice(RanQuest,1);
					var removed = null;				
					var removed = contextPreguntas.splice(RanQuest,1);
					var removed = null;
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
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
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
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (ball, brick) {

    brick.kill();
    NumBlockDestroy = NumBlockDestroy + 1;

    score += 10;

    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() == 0)
    {
        //  New level starts
       /* score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');*/
        gameOver();
    }

}

function ballHitPaddle (ball, paddle) {

    var diff = 0;

    if (ball.x < paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = paddle.x - ball.x;
        ball.body.velocity.x = (-10 * diff);
    }
    else if (ball.x > paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x -paddle.x;
        ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.body.velocity.x = 2 + Math.random() * 8;
    }

}