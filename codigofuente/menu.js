
var button;
var button1;
var text = null;
var w = 1280;
var h = 720;


var menu={

   preload:function () 
{
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setMinMax(400, 300, 1280, 720);
			
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
		
		button = game.add.button(w/2 - 100, h/2, 'button', this.playOnClick, this, 2, 1, 0);
        button1 = game.add.button(w/2 -100, h/2 + 200, 'button2', this.playOnClick2, this, 2, 1, 0);		
		
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



