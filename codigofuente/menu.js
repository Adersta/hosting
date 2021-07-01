
var button;
var button1;
var text = null;

var menu={

   preload:function () 
{
			
            game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
			game.load.spritesheet('button2', 'assets/insbutton.png', 193, 71);
			//game.load.image('menubackground', 'assets/menubackground.png');
			game.load.image('title', 'assets/title.png');
			//game.load.audio('music', ['assets/Slow Sneak Up - Godmode.mp3']);
			//game.load.image('vignette', 'assets/vignette.png');	
}
,

create:function () 
{          
        //music = game.add.audio('music');
		//music.play(null,0,1,true);
	
        //background = game.add.sprite(-95, 0, 'menubackground');
	    //background.fixedToCamera = true;
		
		button = game.add.button(300, 400, 'button', this.playOnClick, this, 2, 1, 0);
        button1 = game.add.button(300, 500, 'button2', this.playOnClick2, this, 2, 1, 0);		
		
		//var vignette = game.add.sprite(0, 0, 'vignette');
		//	vignette.fixedToCamera = true;
		
		
		//var image = game.add.image(0, 100, 'title');
}
,

update:function () 
{

     
				
}
,

playOnClick:function () {

    game.state.start("n1",n1);
	//music.stop();

}
,

playOnClick2:function () {

    game.state.start("ins",ins);
	//music.stop();

}

}



