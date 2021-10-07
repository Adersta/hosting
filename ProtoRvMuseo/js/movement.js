  AFRAME.registerSystem("puntosdecontrol", {
    init: function() {
      // global - shared between all puntosdecontrol components
      this.isMoving = false;
    }
  });

  AFRAME.registerComponent("puntosdecontrol", {
    init: function() {
      let cameraplayer = document.querySelector("#player");
      cameraplayer.addEventListener("animationcomplete", e => {
        this.system.isMoving = false;
      });
      this.el.addEventListener("click", e => {
        if (this.system.isMoving) return;
        let targetPos = this.el.getAttribute("position");
        let cameraplayerPos = cameraplayer.getAttribute("position");
        this.system.isMoving = true;

        cameraplayer.setAttribute("animation", {
          from: cameraplayerPos,
          to: AFRAME.utils.coordinates.stringify({
            x: targetPos.x,
            y: cameraplayerPos.y,
            z: targetPos.z
          }),
          dur: targetPos.distanceTo(cameraplayerPos) * 100
        });
        cameraplayer.emit("go");
      });
    }
  });

  AFRAME.registerComponent("cuadros", {
    init: function() {
      this.el.addEventListener("click", e => {

        var elid = this.el.id;
        console.log(elid);
        var descripcion = "";

        switch (elid) {
          case "imagen1":
            descripcion = "Fragmento de un escrito con unidad temática, que queda diferenciado del resto de fragmentos por un punto y aparte y generalmente también por llevar letra mayúscula inicial y un espacio en blanco en el margen izquierdo de alineación del texto principal";     
            break;
          case "imagen2":
            descripcion = "Imagen 2";       
            break;   
          case "imagen3":
            descripcion = "Imagen 3";       
            break;   
          case "imagen4":   
            descripcion = "Imagen 4";             
            break;
          case "imagen4.5":   
            descripcion = "Imagen 4.5";             
            break;
          case "imagen5":   
            descripcion = "Imagen 5";             
            break;
          case "imagen6":
            descripcion = "Imagen 6";     
            break;
          case "imagen7":
            descripcion = "Imagen 7";       
            break;    
          case "imagen8":   
            descripcion = "Imagen 8";             
            break;
          case "imagen9":   
            descripcion = "Imagen 9";             
            break;
            case "imagen10":
            descripcion = "Imagen 10";     
            break;
          case "imagen11":
            descripcion = "Imagen 11";       
            break;    
          case "imagen12":   
            descripcion = "Imagen 12";             
            break;
          case "imagen13":   
            descripcion = "Imagen 13";             
            break;
          case "imagen14":
            descripcion = "Imagen 14";     
            break;
          case "imagen15":
            descripcion = "Imagen 15";       
            break;    
          case "imagen16":   
            descripcion = "Imagen 16";             
            break;
          case "imagen17":   
            descripcion = "Imagen 17";             
            break;
          default:              
            break;
        }

        var CajaDeTexto = document.getElementById("text-health-player");

        //var cameraplayer = document.getElementById("guiadetexto");
        var playe = document.getElementById("player");
        //var align = cameraplayer.getAttribute("position");
        var align2 = playe.getAttribute("rotation");

        //var a = cadena.split([separador][limite])
        

        //console.log(align2.x); 

        
        CajaDeTexto.setAttribute('text', "value", descripcion);       

        //CajaDeTexto.setAttribute('position', {x:align.x, y:align.y + 1.5, z:align.z });
        //CajaDeTexto.setAttribute('rotation', {x:align2.x, y:align2.y , z:align2.z });
        
      });
    }
  });

  AFRAME.registerComponent("cerrar", {
    init: function() {
      this.el.addEventListener("click", e => {

        var CajaDeTexto = document.getElementById("text-health-player");
        CajaDeTexto.setAttribute('text', "value", "");

        
      });
    }
  });

  AFRAME.registerComponent("video", {
    init: function() {
      let cameraplayer = document.querySelector("#player");
      this.el.addEventListener("click", e => {
        console.log("holaa");
        
        var myBox = document.createElement('a-box');  
        var sceneEl = document.getElementById("escena");
        myBox.setAttribute('position', {x:4.38543, y:5, z:5.06854});
        myBox.setAttribute('rotation', {x:0,y:45, z:0});
        myBox.setAttribute('color', "red");
        sceneEl.appendChild(myBox);

        /*var assets = document.createElement('a-assets');
        
        var video = document.createElement('video'); 
        video.setAttribute('position', {x:-8.45172, y:6.08162, z:-11.73937});  
        video.setAttribute('rotation', {x:0,y:13.796823706750223, z:0});
        video.setAttribute('id', "penguin-sledding");
        video.setAttribute('src', "vidio.mp4");
        video.setAttribute('loop', true);
        //video.setAttribute('autoplay', true);
        //video.setAttribute('width', "16");
        //video.setAttribute('height', "9");
        assets.appendChild(video);*/



        var myvideo = document.createElement('a-video'); 
        myvideo.setAttribute('position', {x:2.583, y:3.487, z:1.463});  
        myvideo.setAttribute('rotation', {x:0,y:-90.000, z:0});
        myvideo.setAttribute('scale', {x:-0.159,y:-0.159, z:-0.159});
        myvideo.setAttribute('src', "#penguin-sledding");
        myvideo.setAttribute('width', "16");
        myvideo.setAttribute('height', "9");
        sceneEl.appendChild(myvideo);

        var video = document.getElementById('penguin-sledding'); 
        video.play();



        
        
      });
    }
  });


  AFRAME.registerComponent("audio1", {
    init: function() {
      this.el.addEventListener("click", e => {

        var sceneEl = document.getElementById("escena");
        var myvideo = document.createElement('a-sound'); 
        myvideo.setAttribute('position', {x:0.285, y:3.941, z:0.390});  
        myvideo.setAttribute('rotation', {x:0,y:-90.000, z:0});
        myvideo.setAttribute('scale', {x:-0.096,y:-0.096, z:-0.096});
        myvideo.setAttribute('src', "#audio1");
        myvideo.setAttribute('width', "16");
        myvideo.setAttribute('height', "9");
        sceneEl.appendChild(myvideo);

        var video = document.getElementById('audio1'); 
        video.play();        
        
      });
    }
  });


  