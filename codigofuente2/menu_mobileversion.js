
var button;
var button1;
var text = null;
var w ;
var h ;


var menu={
   preload:function () 
{
    
    
    //game.scale.startFullScreen(true);
    //game.scale.setMinMax(400, 300, 1280, 720);			
    game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	game.load.spritesheet('button2', 'assets/insbutton.png', 193, 71);
    game.scale.setGameSize(w/2, h/2);
    game.scale.startFullScreen(true); 
}
,

create:function () 
{          
	button = game.add.button(w/4 - 100, h/4, 'button', this.playOnClick, this, 2, 1, 0);
    button1 = game.add.button(w/4 -100, h/4 + 200, 'button2', this.playOnClick2, this, 2, 1, 0);		
}
,

update:function () 
{				
}
,

playOnClick:function () {
    game.state.start("n1",n1);
}
,

playOnClick2:function () {
    game.state.start("ins",ins);
}
}



