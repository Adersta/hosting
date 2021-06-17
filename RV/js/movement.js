
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
