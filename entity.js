/*
  ENTITIES
    -animation capabilities
    -collision boxes

  var player = Object.create(player);
  player.animator(**set animator);
  player.animator.setFrameDelay().....

*/

var entity = {
  position: { x: 0, y: 0 },
  prev_position: { x: 0, y:0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  size: { width: 0, height: 0 },
  hitbox: null,
  setHitbox: function(x, y, w, h, off_top, off_right, off_bottom, off_left) {
    if (arguments.length === 8) {
      this.hitbox = new rectangle(x+off_left, y+off_top, x+w-off_right - (x+off_left), y+h-off_bottom - (y+off_top));
      this.hitbox.offsets = [off_top, off_right, off_bottom, off_left];
    } else if (arguments.length === 6) {
      this.hitbox = new rectangle(x+off_right, y+off_top, x+w-off_right - (x+off_right), y+h-off_top - (y+off_top));
      this.hitbox.offsets = [off_top, off_right];
    } else if (arguments.length === 5) {
      this.hitbox = new rectangle(x+off_top, y+off_top, x+w-off_top - (x+off_top), y+h-off_top - (y+off_top));
      this.hitbox.offsets = [off_top];
    } else {
      this.hitbox = new rectangle(x, y, w, h);
      this.hitbox.offsets = [];
    }
    console.log('hitbox created: '+this.hitbox.info());
  },
  drawHitbox: function(ctx, color) {
    if (!this.hitbox) return;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    ctx.stroke();
    ctx.closePath();
  },
  update: function() {},
  setUpdate: function(func) {
    if (func) {
      this.update = function(time, keys) {
        if (this.hitbox.offsets.length === 4 || this.hitbox.offsets.length === 2) this.hitbox.setPosition({x: this.position.x + this.hitbox.offsets[1], y: this.position.y+this.hitbox.offsets[0]} );
        else if (this.hitbox.offsets.length === 1) this.hitbox.setPosition({x: this.position.x + this.hitbox.offsets[0], y: this.position.y + this.hitbox.offsets[0]});
        else this.hitbox.setPosition(this.position);
        func(time, keys);
      }
    }
  },
  refreshHitbox: function() {
    this.hitbox.setPosition(this.position);
  },
  getInfo: function() {
    return 'pos ('+this.position.x+', '+this.position.y+')';
  },
  getRect: function() {
    return this.hitbox;
  },
  getCollision: function(e) {
    var sides = [0, 0, 0, 0]; //right, up, left, down


  }
};
