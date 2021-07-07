
var button;
var background;
var text = null;

var ins={

   preload:function () 
{
			
            game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
			game.load.image('background', 'assets/instructions.jpg');
			game.load.image('title', 'assets/title.png');
			game.load.audio('music', ['assets/Slow Sneak Up - Godmode.mp3']);
			game.load.image('vignette', 'assets/vignette.png');
}
,

create:function () 
{          
        music = game.add.audio('music');
		music.play(null,0,1,true);
	
        background = game.add.sprite(0, 0, 'background');
	    background.fixedToCamera = true;
		
		
		button = game.add.button(game.world.centerX - 95, 500, 'button', this.playOnClick, this, 2, 1, 0);		
		var vignette = game.add.sprite(0, 0, 'vignette');
			vignette.fixedToCamera = true;
}
,

update:function () 
{
		
}
,

playOnClick:function () {

    game.state.start("n1",n1);
	music.stop();

}

}