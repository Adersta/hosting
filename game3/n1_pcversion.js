var puntero;
var sprite2;
var randompos = 5;
var posibility = 0;
var posibility2 = 0;
var Finalposibility = 0;
var powerbar;
var punteropowerbar;
var w = 1280;
var h = 720;
var CinematicaGamefase = true;
var ApuntadoGamefase = false;
var potenciaGameFase = false;
var FinalGameFase = false;
var FinalCinematic= false;
var objetive;
var puntero2;
var greenarea;
var FaseTempo = 0;
var video;
var videopart2;
var choise = 0;
let preguntas = ["pregunta 1","pregunta 2","pregunta 3","pregunta 4","pregunta 5","pregunta 6","pregunta 7","pregunta 8"];
let contextPreguntas = ["contexto 1","contexto 2","contexto 3","contexto 4","contexto 5","contexto 6","contexto 7","contexto 8"];
var respuestas = ["A","A","A","A","A","A","A","A"];
var score=0;
var continueButton ;
var gameovercount = 0;


var n1={
   preload:function () 
{
	game.load.image('puntero', 'assets/puntero.png');
	game.load.image('greenarea', 'assets/greenarea.png');
	game.load.image('atari2', 'assets/doll.png');
	game.load.image('powerbar', 'assets/powerbar.jpg');
	game.load.image('background', 'assets/background.jpg');
	game.load.video('video', 'assets/video.mp4');
	game.load.video('videopart2', 'assets/parte2.mp4');
	game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
	game.load.spritesheet('continuebutton', 'assets/button-round-a.png',96,96);
	game.load.image('GameOver', 'assets/gameover.jpg');
}
,

create:function () 
{
	//BACKGROUND
	var background = game.add.sprite(0, 0, 'background');
	background.fixedToCamera = true;

	//VIDEOS
	video = game.add.video('video');
	videopart2 = game.add.video('videopart2');
	
	video.muted= true;

	

	video.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
	//videopart1.addToWorld(780, 580, 1, 1, 0.5, 0.5);
	video.addToWorld(w, h, 1, 1, 2.4, 2.4, loop = false );

	

	//  x, y, anchor x, anchor y, scale x, scale y
	//videopart2.addToWorld(w, h, 1, 1, 2.4, 2.4, loop = true );

	//PHYSICS
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 100;

	puntero = game.add.sprite(game.world.centerX, game.world.centerY, 'puntero');
    game.physics.enable(puntero, Phaser.Physics.ARCADE);

	
	//game.add.tween(sprite2).to( { y: 400 }, 3000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);	

	//fires			
	objetive = game.add.physicsGroup();
	//ball = game.add.sprite(400, 100, 'atari2',objetive);
	//map.createFromTiles(14,-1,'fireEnemy',layer,fires);
	//objetive.setAll("body.velocity.y",200);

	sprite2 = objetive.create(400, 100, 'atari2');
	sprite2.body.setCircle(16);
	sprite2.body.fixedRotation = true;
	
	puntero.visible = 0;
	sprite2.visible = 0;

	//SECOND PHASE OBJECTS
	powerbar = game.add.sprite(w/2 -150, h-85, 'powerbar');
	
	randompos = Math.floor(Math.random() * ((w/2 +100) - (w/2 -150)) + (w/2 -150)); 
	greenarea = game.add.sprite(randompos, h-100, 'greenarea');
	game.physics.enable(greenarea, Phaser.Physics.ARCADE);

	puntero2 = game.add.physicsGroup();
	//punteropowerbar = puntero2.create(151, 100, 'puntero');
	punteropowerbar = puntero2.create(w/2 -151, h-100, 'puntero');
	//punteropowerbar.body.setCircle(16);
	//punteropowerbar.body.fixedRotation = true;
	//puntero2.setAll("body.velocity.x",0);

	greenarea.visible = 0;
	punteropowerbar.visible = 0;
	powerbar.visible = 0;

	//FINAL PHASE SCORE
	shoot = game.add.text(w/2, h-600, '', { font: '30px Arial', fill: '#000000' });
	shoot.anchor.setTo(0.5, 0.5);
	shoot.fixedToCamera = true;
		
	Finalscore = game.add.text(w/2, h-500, '', { font: '30px Arial', fill: '#000000' });
	Finalscore.anchor.setTo(0.5, 0.5);
	Finalscore.fixedToCamera = true;

	
	continueButton = game.add.button(w/2, h-300, 'continuebutton', this.quest, this,2, 1, 0);
	continueButton.fixedToCamera = true;

	shoot.visible = 0;
	Finalscore.visible = 0;
	continueButton.visible = 0;

	//CONTROLS
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	
}
,

update:function () 
{
	if(gameovercount > 1){
		game.paused = true;
		var background = game.add.sprite(0, 0, 'GameOver');
	    background.fixedToCamera = true;
	}
	//CINEMATIC
	if(CinematicaGamefase == true){
		if(video.currentTime > 3.5){
			puntero.visible = 1;
	        sprite2.visible = 1;
			ApuntadoGamefase = true;
			CinematicaGamefase = false;
		}
	}

	//VIDEOCONTROLS
	if(video.currentTime>=3.5 && FinalGameFase==false){
		video.paused = true;
	}
	else{
		video.paused = false;
	}

	



	
	
	//MOVEMENTE OF MOUSE AND PUNTERO
    if (game.input.mousePointer.isDown && ApuntadoGamefase == true)
    {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(puntero, 1000);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(puntero.body, game.input.x, game.input.y))
        {
            puntero.body.velocity.setTo(0, 0);
        }
    }
    else
    {
        puntero.body.velocity.setTo(0, 0);	
    }

	//POSIBILITY WHEN PUNTERO AND OBJETIVE IS OVERLAP AND THE USER SHOOT
	if(this.distance(puntero.body.position.x, puntero.body.position.y, sprite2.body.position.x, sprite2.body.position.y)
	 && fireButton.isDown && ApuntadoGamefase == true)
    {
        posibility = posibility + this.distance(puntero.body.position.x, puntero.body.position.y, sprite2.body.position.x, sprite2.body.position.y);
    }

	//OBJETIVE MOVEMENT
	if (ApuntadoGamefase == true) {
		objetive.forEach(this.IAFire,this);	
	}
	else{
		objetive.setAll("body.velocity.y",0);
	}

	if(fireButton.isDown && ApuntadoGamefase == true)
    {
        //game.paused = true;
		ApuntadoGamefase = false;
		potenciaGameFase = true;

		greenarea.visible = 1;
	punteropowerbar.visible = 1;
	powerbar.visible = 1;
		//this.createForceLabel();


    }

	//SECOND FASE

	//PUNTERO 2 MOVEMENT
	if (potenciaGameFase == true) {
		FaseTempo = FaseTempo + 0.1;
		puntero2.forEach(this.IApuntero2,this);	
	}
	else if(potenciaGameFase == false){
		puntero2.setAll("body.velocity.x",0);
	}

	//POSIBILITY WHEN PUNTERO AND GREENAREA IS OVERLAP AND THE USER SHOOT
	/*if(checkOverlap(punteropowerbar, greenarea) && fireButton.isDown && potenciaGameFase == true)
    {
        posibility2 = posibility2 + 5;
		if(posibility2 > 5){
			posibility2 = 5;

		}
    }

	*/

	if(this.distance(punteropowerbar.body.position.x, punteropowerbar.body.position.y, greenarea.body.position.x, greenarea.body.position.y) 
	&& fireButton.isDown && potenciaGameFase == true && FaseTempo >5 )
    {
        posibility2 = posibility2 + this.distance(punteropowerbar.body.position.x, punteropowerbar.body.position.y, greenarea.body.position.x, greenarea.body.position.y) ;
    }
	
	if(potenciaGameFase == true && fireButton.isDown && FaseTempo >5 )
    {
		FinalGameFase = true;
		potenciaGameFase = false;
	}

	if(video.currentTime >= 7.8 && video.currentTime <= 7.9 && FinalGameFase==true){
		video.paused = true;
		this.tirofinal();
	}

	



	Finalposibility = posibility + posibility2;
	//console.log(potenciaGameFase) 
	//FINAL PHASE



	//console.log (this.distance(punteropowerbar.body.position.x, punteropowerbar.body.position.y, greenarea.body.position.x, greenarea.body.position.y));

	
	
	console.log ("probabilidad: " + Finalposibility);
	

}
,

createForceLabel:function(){
	
	
	/*powerbar = game.add.sprite(w/2 -150, h-85, 'powerbar');

	let randompos = Math.floor(Math.random() * ((w/2 +150) - (w/2 -150)) + (w/2 -150)); 
	greenarea = game.add.sprite(randompos, h-100, 'greenarea');

	punteropowerbar = puntero2.create(w/2 -150, h-100, 'puntero');
	//punteropowerbar.body.setCircle(16);
	//punteropowerbar.body.fixedRotation = true;
	puntero2.setAll("body.velocity.x",600);*/

}
,

distance: function (x1, y1, x2, y2) {

	var dx = x1 - x2;
	var dy = y1 - y2;

	return Math.sqrt(dx * dx + dy * dy);

},

tirofinal:function(){

	game.paused = true;
	shoot.visible = 1;
	Finalscore.visible = 1;
	continueButton.visible = 1;
	if(Finalposibility >= 50){
		shoot.text = "Fallaste";
		score = score + 0;
		Finalscore.text = 'PUNTUACION: '+ score;
	}
	else if(Finalposibility >= 30 && Finalposibility <= 50){
		shoot.text = "ACERTASTE";	
		score = score + 5;
		Finalscore.text = 'PUNTUACION: '+ score;
	}
	else if(Finalposibility <= 30){
		shoot.text = "TIRO PERFECTO";
		score = score + 10;
		Finalscore.text = 'PUNTUACION: '+ score;
	}
}
,

quest:function(){

	////
	shoot.visible = 0;
	Finalscore.visible = 0;
	continueButton.visible = 0;
	
	//continueButton.destroy();
	/////

	let RanQuest = Math.floor(Math.random() * preguntas.length);
	console.log("ran " + RanQuest);

	// When the paus button is pressed, we pause the game
	game.paused = true;
	
	// Then add the menu
	menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	menu.fixedToCamera = true;

	// And a label to illustrate which menu item was chosen. (This is not necessary)
	choiseLabel = game.add.text(w/2, h-600, ''+preguntas[RanQuest], { font: '30px Arial', fill: '#000000' });
	choiseLabel.anchor.setTo(0.5, 0.5);
	choiseLabel.fixedToCamera = true;

	contextlabel = game.add.text(w/2, h-500, ''+contextPreguntas[RanQuest], { font: '30px Arial', fill: '#000000' });
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
				y1 = h/2 - 180/2, y2 = h/2 + 180/2;

			// Check if the click was inside the menu
			if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
				// The choicemap is an array that will help us see which item was clicked
				var choisemap = ['A', 'B', 'C', 'D', 'five', 'six'];

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
					choiseLabel.destroy();
					contextlabel.destroy();
					//respuestas.remove(RanQuest);
					choise = 0;	
					// Unpause the game
					game.paused = false;

					//preguntas.remove(RanQuest);
					var removed = preguntas.splice(RanQuest,1);
					var removed = null;				
					var removed = respuestas.splice(RanQuest,1);
					var removed = null;				
					var removed = contextPreguntas.splice(RanQuest,1);
					var removed = null;

					FinalGameFase = false;

					score = score + 10;
					gameovercount = gameovercount + 1;

					Restart();

					
					
				}
				else if(choisemap[choise] != respuestas[RanQuest]){
					choise = 0;
					menu.destroy();
					choiseLabel.destroy();
					contextlabel.destroy();
					game.paused = false;
					FinalGameFase = false;
					gameovercount = gameovercount + 1;
					Restart();
				}
				
				
			}
			
		}
	};
}
,

IAFire:function(localenemy) { 
	if(localenemy.body.position.y < 150 ){ //high
		localenemy.body.velocity.y = +600 ;
		}
		if(localenemy.body.position.y > h -100){ //down
		localenemy.body.velocity.y = -600 ;
		}   
}
,

IApuntero2:function(localenemy) { 
	
	if(localenemy.body.position.x < w/2 -150 ){ //high
		localenemy.body.velocity.x = +600 ;
		
		}
		if(localenemy.body.position.x > w/2 + 140){ //down
		localenemy.body.velocity.x = -600 ;
		}   

}
,

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function Restart(){

	sprite2.destroy();

	sprite2 = objetive.create(400, 100, 'atari2');
	sprite2.body.setCircle(16);
	sprite2.body.fixedRotation = true;


	punteropowerbar.destroy();
	punteropowerbar = puntero2.create(w/2 -151, h-100, 'puntero');


		CinematicaGamefase = true;
	ApuntadoGamefase = false;
	potenciaGameFase = false;
	FinalGameFase = false;	
	objetive.setAll("body.velocity.y",200);
    puntero.visible = 0;
    sprite2.visible = 0;
    greenarea.visible = 0;
punteropowerbar.visible = 0;
powerbar.visible = 0; 
video.currentTime = 0;
Finalposibility = 0;
posibility = 0;
posibility2 = 0;
FaseTempo = 0;
}