/*AFRAME.registerComponent('static-movement', {
    schema: {default: ''},
       init: function () {
         var el = this.el;
         el.addEventListener('click', function () {
            document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
            console.log("click");
         });

         console.log("hola");
       }
     });

AFRAME.registerComponent('collider-check', {
  schema: {default: ''},
  //dependencies: ['raycaster'],

  init: function () {
    var el = this.el;
    var timer = 0;
    console.log('timer : ' + timer);
    el.addEventListener('click', function () {
    //el.addEventListener('raycaster-intersection', function () {
      //document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
      //document.querySelector('#player').setAttribute('position', el.getAttribute('position'));  
      document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
      timer = timer + 0.1;
      if(timer > 2.5){
        
        
        console.log('Player hit something!');
        timer = 0;
      }      
    });
  }
});

//AFRAME.registerComponent('collidable', {
var timer = 0;
AFRAME.registerComponent('puntosdecontrol', {
    init: function () {
      this.el.addEventListener('raycaster-intersected', evt => {
        this.raycaster = evt.detail.el;
      });
      this.el.addEventListener('raycaster-intersected-cleared', evt => {
        this.raycaster = null;
      });
    },
    tick: function () {  
        if (!this.raycaster) { return; }  // Not intersecting.
        //let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
        let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
        if (!intersection) { return; } // Not intersecting
        // intersecting
        timer = timer + 0.1;
        if(timer > 4){    
          let intersection = this.raycaster.components.raycaster.getIntersection(this.el);  
          document.querySelector('#player').setAttribute('position', intersection.point);    
          timer = 0;
        }   
    }
  });*/



  AFRAME.registerComponent('puntosdecontrol', {
    schema: {default: ''},
    init() {
       
      //var timer = 0;     
      var objetive = this.el;
      var player = document.querySelector('#player');
    
      objetive.addEventListener('click', () => {
      //el.addEventListener('raycaster-intersection', function () {
      //document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
      //document.querySelector('#player').setAttribute('position', el.getAttribute('position'));  
      //document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
      console.log('Player hit something!');
      /*timer = timer + 0.1;
      if(timer > 2.5){
        
        
        console.log('Player hit something!');
        timer = 0;
      }    */        

      player.setAttribute('position',objetive.getAttribute('position'));
       
    }); 
        
        
        
    }
  });
