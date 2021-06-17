  AFRAME.registerSystem("goto", {
    init: function() {
      // global - shared between all goto components
      this.isMoving = false;
    }
  });

  AFRAME.registerComponent("goto", {
    init: function() {
      let rig = document.querySelector("#pov");
      rig.addEventListener("animationcomplete", e => {
        this.system.isMoving = false;
      });
      this.el.addEventListener("click", e => {
        if (this.system.isMoving) return;
        let targetPos = this.el.getAttribute("position");
        let rigPos = rig.getAttribute("position");
        this.system.isMoving = true;

        rig.setAttribute("animation", {
          from: rigPos,
          to: AFRAME.utils.coordinates.stringify({
            x: targetPos.x,
            y: rigPos.y,
            z: targetPos.z
          }),
          dur: targetPos.distanceTo(rigPos) * 750
        });
        rig.emit("go");
      });
    }
  });
