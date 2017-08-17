var animator = (function() {

  var delay;
  var elapsed_frames = 0;
  var set = {};
  var running = false;
  var sprites = [];
  var current_frame = 0;
  var currentAnimation = '';

  return function(path, width, height) {

    spritesheet.getSprites(path, width, height, function(_sprites) { sprites = _sprites; console.log('sprites loaded')});

    this.drawFrame = function(ctx, x, y) {

      if (!running) return;

      if (elapsed_frames >= delay) {
        elapsed_frames = 0;
        ctx.drawImage(sprites[set[currentAnimation][current_frame++]], x, y);
        if (current_frame >= set[currentAnimation].length)
          current_frame = 0;
      } else {
        ctx.drawImage(sprites[set[currentAnimation][current_frame]], x, y); //allow for the current frame to be repeated if there is a frame delay
        elapsed_frames++;
      }

    };

    this.setAnimation = function(name) {
      if (set.hasOwnProperty(name)) {
        currentAnimation = name;
        current_frame = 0;
      }

      return this;
    } //set the current animation to use

    this.getAnimation = function() {
      return currentAnimation;
    }

    this.setAnimationSet = function(group) {
      set = group;
      return this;
    } //set the group of animations to choose from
    this.setFrameDelay = function(_delay) {
      delay = _delay;
      return this;
    } //set frame skips for slower animations
    this.start = function() {
      running = true;
    } //sets the animation to run so its used by draw()
    this.stop = function() {
      running = false;
    }
    this.running = function() {
      return running;
    };
  };
})();
