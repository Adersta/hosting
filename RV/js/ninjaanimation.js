var prevData = "clip: idle; crossFadeDuration: .3";;
    var listenerAdded = false;
    var scene = document.querySelector('a-scene');  
    var playOnce = false; 

AFRAME.registerComponent('animation-control', {
  schema: {default: ''},
  init() {
     
    const bot = document.querySelector('#ninja01'); 
    //var jumpBut = document.querySelector('#jump');
    //var runBut = document.querySelector('#run');
    //var walkBut = document.querySelector('#walk');
    //var idleBut = document.querySelector('#idle');  
    var scene = document.querySelector('a-scene');
  
  this.el.addEventListener('click', () => {
      
      bot.setAttribute("animation-mixer",this.data); 
      prevData = this.data;       
     
    }); 
      
      
      
  }
});