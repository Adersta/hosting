
var button;
var background;
var text = null;

var restartmenu={

   preload:function () 
{
			
            game.load.spritesheet('button', 'assets/restartbutton.png', 193, 71);
			game.load.image('background', 'assets/restartbackground.jpg');
			game.load.image('title', 'assets/restarttitle.png');
			game.load.audio('music', ['assets/Whole Tone Limbo - Godmode.mp3']);
			
}
,

create:function () 
{          
        music = game.add.audio('music');
		music.play(null,0,1,true);
	
        background = game.add.sprite(0, 0, 'background');
	    background.fixedToCamera = true;
		
		var image = game.add.image(0, 100, 'title');
		
		button = game.add.button(300, 350, 'button', this.playOnClick, this, 2, 1, 0);		
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