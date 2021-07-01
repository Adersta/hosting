
var button;
var button1;
var text = null;

var controls={

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
		
		res1 = game.add.button(100, 400, 'button', this.playOnClick, this, 2, 1, 0);
        res2 = game.add.button(150, 500, 'button2', this.playOnClick2, this, 2, 1, 0);

        res3 = game.add.button(350, 400, 'button2', this.playOnClick2, this, 2, 1, 0);	
        res4 = game.add.button(350, 500, 'button2', this.playOnClick2, this, 2, 1, 0);	
        
        text = game.add.text(400, 60, "Pregunta 1");
			text.anchor.setTo(0.5);
			
			text.font = 'Revalia';
			text.fontSize = 50;
			
			text.fill = '#FF00DF';
			text.fixedToCamera = true;

        text2 = game.add.text(400, 300, "Contexto de la pregunta");
			text2.anchor.setTo(0.5);
			
			text2.font = 'Revalia';
			text2.fontSize = 20;
			
			text2.fill = '#FF00DF';
			text2.fixedToCamera = true;
		
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

}
,

playOnClick2:function () {


}
,

playOnClick3:function () {


}
,
playOnClick4:function () {


}

}