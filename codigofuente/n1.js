var map;
var layer;
var player;
var facing = 'left';
var cursors;
var jumpButton;
var jumpTimer = 0;
var dolls;
var dollHUD;
var platforms;
var platformsVer;
var text = null;
var textskill = null;
var witches;
var moles;
var fires;
var bullets;
var distanceEnemy = 20;
var fireRate = 1500;
var nextFire = 0;
var transform = 0;
var cooldownRate = 10000;
var nextcooldown = 0;
var lasttransform = 0;
var ghostwalls;
var earth;
var wins;
var ant = 0;
var numdolls = 0;

var nextJump = 0;
var left=false;
var right=false;
var duck= false;
var fire=false;
var jump=false;

var w = 1280;
var h = 720;

var choise = 0;

let preguntas = ["pregunta 1","pregunta 2","pregunta 3","pregunta 4","pregunta 5","pregunta 6","pregunta 7","pregunta 8"];
let contextPreguntas = ["contexto 1","contexto 2","contexto 3","contexto 4","contexto 5","contexto 6","contexto 7","contexto 8"];
var respuestas = ["A","A","A","A","A","A","A","A"];

var score=0;

var n1={


   preload:function () 
{
	        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.scale.setMinMax(400, 300, 1280, 720);

	        game.load.spritesheet('checkpoint', 'assets/Witch.png', 92, 114);
	        game.load.tilemap('map', 'assets/map1.csv', null, Phaser.Tilemap.CSV);
	        game.load.image('tiles', 'assets/tiled1.png');
	        game.load.image('barra', 'assets/barra.png');
            game.load.image('background', 'assets/background.jpg');
	        game.load.image('vignette', 'assets/vignette.png');
            game.load.image('platform', 'assets/platform.png');
            game.load.image('doll', 'assets/doll.png');
            game.load.spritesheet('player', 'assets/player.png', 78, 108);
	        game.load.spritesheet('WitchEnemy', 'assets/Witch.png', 115, 115);
			game.load.spritesheet('MoleEnemy', 'assets/Mole.png', 115, 115);
			game.load.image('fireEnemy', 'assets/fire.png');
			game.load.image('bullet', 'assets/bullet.png');			
			game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
			game.load.image('ghostwall', 'assets/ghostwall.png');
			game.load.image('earth', 'assets/earth.png');
			game.load.image('winpoint', 'assets/winpoint.png');
			game.load.audio('ambient', ['assets/Dangerous Toys - SefChol.mp3']);
			game.load.audio('lose', ['assets/lose.mp3']);
			game.load.audio('jump', ['assets/jump.mp3']);
			game.load.audio('bonus', ['assets/bonus.mp3']);	
			game.load.audio('poss', ['assets/possession.mp3']);	
			game.load.audio('desposs', ['assets/desposs.mp3']);	
			game.load.audio('win', ['assets/win.mp3']);		
			
			//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

			//gamepad buttons
			game.load.spritesheet('buttonvertical', 'assets/button-vertical.png',64,64);
			game.load.spritesheet('buttonhorizontal', 'assets/button-horizontal.png',96,64);
			game.load.spritesheet('buttondiagonal', 'assets/button-diagonal.png',64,64);
			game.load.spritesheet('buttonfire', 'assets/button-round-a.png',96,96);
			game.load.spritesheet('buttonjump', 'assets/button-round-b.png',96,96);


			game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
			game.load.image('diamond', 'assets/sprites/diamond.png');
			
}
,

create:function () 
{
	
			ant = 0;
			
			numdolls = 0;
			
			var background = game.add.sprite(0, 0, 'background');
			background.fixedToCamera = true;
			//tiledmap
			map = game.add.tilemap('map',64,64);
			map.addTilesetImage("tiles");
			layer = map.createLayer(0);
			layer.resizeWorld();
			map.setCollisionBetween(0,3);
			map.setCollisionBetween(7,11);
			map.setCollision(13);
			map.setCollisionBetween(15,58);
			map.setCollisionBetween(60,68);
			map.setCollisionBetween(70,116);
			map.setCollisionBetween(118,250);			
			
			//HUD
		text = game.add.text(w-200, 0+100,"puntuacion: " + score);
		text.anchor.setTo(0.5);
		
		text.font = 'Revalia';
		text.fontSize = 40;
		
		text.fill = '#FF00DF';
		text.fixedToCamera = true;

            //physics
            game.physics.startSystem(Phaser.Physics.ARCADE);
			
            //gravity
            //game.physics.arcade.gravity.y = 250;

            //player
			player = game.add.sprite(0, 0 , 'player');
            //player = game.add.sprite(20, 1300 - 400, 'player');
            //player = game.add.sprite(1900, 500 - 400, 'player');
			//player = game.add.sprite(4500, 500 - 400, 'player');
			game.physics.enable(player, Phaser.Physics.ARCADE);//Player collisions with the world

            player.body.bounce.y = 0;
            player.body.collideWorldBounds = false;			

            player.body.gravity.y=400;

            //player animations
            player.animations.add('left', [6,7,8,9,10,11], 10, true);
            player.animations.add('turn', [0,1,2,3,4,5], 10, true);
            player.animations.add('right', [12,13,14,15,16,17], 10, true);
			player.animations.add('leftWitch', [24,25,26,27,28,29], 10, true);
            player.animations.add('turnWitch', [18,19,20,21,22,23], 10, true);
            player.animations.add('rightWitch', [30,31,32,33,34,35], 10, true);
			player.animations.add('leftMole', [42,43,44,45,46,47], 10, true);
            player.animations.add('turnMole', [36,37,38,39,40,41], 10, true);
            player.animations.add('rightMole', [48,49,50,51,52,53], 10, true);

            game.camera.follow(player);//camera follow player

            //controls
            cursors = game.input.keyboard.createCursorKeys();
            jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

			//checkpoints			
			checkpoints = game.add.physicsGroup();
			map.createFromTiles(12,-1,'checkpoint',layer,checkpoints);
			checkpoints.setAll('body.gravity.y', 400);
			checkpoints.setAll('body.collideWorldBounds', true);

            //platforms
            platforms= game.add.physicsGroup();
			map.createFromTiles(4,-1,'platform',layer,platforms);
			platforms.setAll('body.immovable', true);
			platforms.setAll("body.velocity.x",200);
			
			platformsVer= game.add.physicsGroup();
			map.createFromTiles(3,-1,'platform',layer,platformsVer);
			platformsVer.setAll('body.immovable', true);
			platformsVer.setAll("body.velocity.y",200);
			
			//winpoint
            wins= game.add.physicsGroup();
			map.createFromTiles(59,-1,'winpoint',layer,wins);
			wins.setAll('body.immovable', true);
			
			//fires			
			fires = game.add.physicsGroup();
			map.createFromTiles(14,-1,'fireEnemy',layer,fires);
			fires.setAll("body.velocity.y",200);

			// create our virtual game controller buttons 
			buttonjump = game.add.button(w-200, 500, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
			buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
			buttonjump.events.onInputOver.add(function(){jump=true;});
			buttonjump.events.onInputOut.add(function(){jump=false;});
			buttonjump.events.onInputDown.add(function(){jump=true;});
			buttonjump.events.onInputUp.add(function(){jump=false;});
		     	
			buttonleft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
			buttonleft.fixedToCamera = true;
			buttonleft.events.onInputOver.add(function(){left=true;});
			buttonleft.events.onInputOut.add(function(){left=false;});
			buttonleft.events.onInputDown.add(function(){left=true;});
			buttonleft.events.onInputUp.add(function(){left=false;});
		
			buttonright = game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
			buttonright.fixedToCamera = true;
			buttonright.events.onInputOver.add(function(){right=true;});
			buttonright.events.onInputOut.add(function(){right=false;});
			buttonright.events.onInputDown.add(function(){right=true;});
			buttonright.events.onInputUp.add(function(){right=false;});
		
			buttondown = game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
			buttondown.fixedToCamera = true;
			buttondown.events.onInputOver.add(function(){duck=true;});
			buttondown.events.onInputOut.add(function(){duck=false;});
			buttondown.events.onInputDown.add(function(){duck=true;});
			buttondown.events.onInputUp.add(function(){duck=false;});

			

}
,

update:function () 
{
			
			game.physics.arcade.collide(player, layer);
            game.physics.arcade.collide(player, platforms);
			game.physics.arcade.overlap(player, wins, this.winlevel, null, this);
			game.physics.arcade.collide(player, platformsVer);
			game.physics.arcade.overlap(player, fires, this.firekill, null, this);		

			game.physics.arcade.overlap(player, checkpoints);
			game.physics.arcade.collide(checkpoints, layer);
			game.physics.arcade.overlap(player, checkpoints, this.question, null, this);
			
            //Controls
			player.body.velocity.x = 0;

				///////////////////////////////////////////////////////////

				if (left && !duck || cursors.left.isDown) {
					//player.body.moveLeft(500);
					player.body.velocity.x = -200;
					if (facing != 'left'){
						player.animations.play('left');
						facing = 'left';                       
					}
				}
				else if (right && !duck || cursors.right.isDown) {
					//player.body.moveRight(500);
					player.body.velocity.x = 200;
					if (facing != 'right'){
						player.animations.play('right');
						facing = 'right';                       
					}
				} 
				else{
					if (facing != 'idle')
					{
					player.animations.stop();
					
					if (facing == 'left'){
						player.animations.play('turn');
					}
					else{
						player.animations.play('turn');
					}

					facing = 'idle';
					}
				}
				if((jump || jumpButton.isDown) && (player.body.onFloor() || player.body.touching.down)){ 
					player.body.velocity.y = -400;
					jumpTimer = game.time.now + 750;
					cooldown = 100;
				}

				//platform movement
				platforms.forEach(this.platMoveH,this);
				platformsVer.forEach(this.platMoveV,this);
				
				
				if(player.body.position.y < -4000){
					player.kill();
					game.state.start("restartmenu",restartmenu);					
					}
				if(player.body.position.y > 4000){
					player.kill();
					game.state.start("restartmenu",restartmenu);					
					}	
					
					/*console.log("preguntas " + preguntas);
					console.log("contexto " + contextPreguntas);
					console.log("respuestas " + contextPreguntas);*/

					text.setText("Puntuacion: " + score);
					
					//IA Enemy
				//checkpoints.forEach(this.IA,this);
}
,

question:function (player,checkpoint) {	
	checkpoint.destroy();
	this.quest()
	
}
,

quest:function(){

	let RanQuest = Math.floor(Math.random() * preguntas.length);
	console.log("ran " + RanQuest);

	//choise = 0;
	// When the paus button is pressed, we pause the game
	game.paused = true;
	
	// Then add the menu
	menu = game.add.sprite(w/2, h/2, 'menu');
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
,


IAFire:function (localenemy) {   
		   
		   if(localenemy.body.position.y < 350){ //high
		   localenemy.body.velocity.y = +600 ;
		   }
		   if(localenemy.body.position.y > 1200){ //down
		   localenemy.body.velocity.y = -600 ;
		   }
}
,

firekill:function (player,fire) {
           player.kill();
		   loseSound.play(null,1,1,false);
		   AmMusic.stop();
		   game.state.start("restartmenu",restartmenu);
}
,

platMoveH:function (platform) {   

		   if(platform.body.position.x < 2200){ //high
		   platform.body.velocity.x = +200 ;
		   }
		   if(platform.body.position.x > 2700){ //down
		   platform.body.velocity.x = -200 ;
		   }
}
,

platMoveV:function (platform) {   
		   
		   if(platform.body.position.y < 350){ //high
		   platform.body.velocity.y = +300 ;
		   }
		   if(platform.body.position.y > 1200){ //down
		   platform.body.velocity.y = -300 ;
		   }
}
,

winlevel:function (player,wins) {   
		   
		   if(numdolls == 4){
			   win.play(null,1,1,false);
			   AmMusic.stop();
			   game.state.start("menu",menu);
		   }	   
		   
}


}
