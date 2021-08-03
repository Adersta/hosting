window.onload = function() {
	var gameRatio = window.innerWidth/window.innerHeight;		
	var game = new Phaser.Game(Math.ceil(640*gameRatio), 640, Phaser.CANVAS);

  game.state.add("menu",menu);
game.state.add("n1",n1);
game.state.start("menu",menu);
}