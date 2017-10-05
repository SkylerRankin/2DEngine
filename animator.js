function animator(path, width, height) {

  this.delay;
  this.elapsed_frames = 0;
  this.set = {};
  this.running = false;
  this.sprites = [];
  this.current_frame = 0;
  this.currentAnimation = '';

  spritesheet.getSprites(path, width, height, function(_sprites, self) { self.sprites = _sprites; console.log('sprites loaded');}, this);

  this.drawFrame = function(ctx, x, y) {

    if (!this.running) return;

    if (this.elapsed_frames >= this.delay) {
      this.elapsed_frames = 0;
      ctx.drawImage(this.sprites[this.set[this.currentAnimation][this.current_frame++]], x, y);
      if (this.current_frame >= this.set[this.currentAnimation].length)
        this.current_frame = 0;
    } else {
      if (this.sprites[this.set[this.currentAnimation][this.current_frame]])
      ctx.drawImage(this.sprites[this.set[this.currentAnimation][this.current_frame]], x, y); //allow for the current frame to be repeated if there is a frame delay
      this.elapsed_frames++;
    }

  };

  this.setAnimation = function(name) {
    if (this.set.hasOwnProperty(name)) {
      this.currentAnimation = name;
      this.current_frame = 0;
    }

    return this;
  } //set the current animation to use

  this.getAnimation = function() {
    return this.currentAnimation;
  }

  this.setAnimationSet = function(group) {
    this.set = group;
    return this;
  } //set the group of animations to choose from
  this.setFrameDelay = function(_delay) {
    this.delay = _delay;
    return this;
  } //set frame skips for slower animations
  this.start = function() {
    this.running = true;
  } //sets the animation to run so its used by draw()
  this.stop = function() {
    this.running = false;
  }
  this.running = function() {
    return this.running;
  };

}
