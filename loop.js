(function(state) {

  var lastFrameTimeMs = 0,
      maxFPS = 60,
      delta = 0,
      timestep = 1000/60,
      fps = 60,
      framesThisSecond = 0,
      lastFpsUpdate = 0,
      frameid;

  var begin = function () {},
      update = function() {},
      draw = function() {},
      end = function() {};

  state.loop = {

    setMaxFPS: function(_maxFPS) {
      maxFPS = _maxFPS || maxFPS;
    },

    setTimestep: function(_timestep) {
      timestep = _timestep || timestep;
    },

    fps: function() {
      return fps;
    },

    setBegin: function(func) {
      begin = func || begin;
    },

    setUpdate: function(func) {
      update = func || update;
    },

    setDraw: function(func) {
      draw = func || draw;
    },

    setEnd: function(func) {
      end = func || end;
    },

    start: function() {
      frameid = requestAnimationFrame(function(timestamp) {
        lastFrameTimeMs = timestamp;
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
        frameid = requestAnimationFrame(mainLoop);
      });
    },

    stop: function() {
      cancelAnimationFrame(frameid);
    },
  };

  function mainLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
      requestAnimationFrame(mainLoop);
      return;
    }

    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    begin(timestamp);
    if (timestamp > lastFpsUpdate + 1000) {
      fps = 0.25*framesThisSecond+0.75*fps;
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
    }
    framesThisSecond++;

    var updateIterations = 0;
    while (delta >= timestep) {
      update(timestep);
      delta -= timestep;
      if (updateIterations++ >= 240) {
        delta = 0;
        break;
      }
    }

    draw();
    frameid = requestAnimationFrame(mainLoop);
    end();
  }

})(this);
