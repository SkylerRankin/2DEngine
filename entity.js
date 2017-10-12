/*
  ENTITIES
    -animation capabilities
    -collision boxes

  var player = Object.create(player);
  player.animator(**set animator);
  player.animator.setFrameDelay().....

*/

function entity(_x, _y) {
  this.name = 'unnamed entity';
  this.position = { x: _x || 0, y: _y || 0 };
  this.prev_position = { x: 0, y:0 };
  this.velocity = { x: 0, y: 0 };
  this.acceleration = { x: 0, y: 0 };
  this.size = { width: 0, height: 0 };
  this.hitbox = null;
  this.offsets = null
  this.setName = function(s) { if (s) this.name = s; };
  this.setHitbox = function(x, y, w, h, off_top, off_right, off_bottom, off_left) {
    if (arguments.length === 8) {
      this.hitbox = new rectangle(x+off_left, y+off_top, x+w-off_right - (x+off_left), y+h-off_bottom - (y+off_top));
      this.offsets = [off_top, off_right, off_bottom, off_left];
    } else if (arguments.length === 6) {
      this.hitbox = new rectangle(x+off_right, y+off_top, x+w-off_right - (x+off_right), y+h-off_top - (y+off_top));
      this.offsets = [off_top, off_right];
    } else if (arguments.length === 5) {
      this.hitbox = new rectangle(x+off_top, y+off_top, x+w-off_top - (x+off_top), y+h-off_top - (y+off_top));
      this.offsets = [off_top];
    } else {
      this.hitbox = new rectangle(x, y, w, h);
      this.offsets = [];
    }
    console.log('hitbox created: '+this.hitbox.info());
  };
  this.drawHitbox = function(ctx, color) {
    if (!this.hitbox) return;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    ctx.stroke();
    ctx.closePath();
  };
  this.update = function() {};
  this.setUpdate = function(func) {
    if (func) {
      this.update = function(time, keys) {
        if (this.offsets.length === 4 || this.offsets.length === 2) this.setHitboxPosition({x: this.position.x + this.offsets[1], y: this.position.y+this.offsets[0]} );
        else if (this.offsets.length === 1) this.setHitboxPosition({x: this.position.x + this.offsets[0], y: this.position.y + this.offsets[0]});
        else this.setHitboxPosition(this.position);
        func(time, keys);
      }
    }
  };
  this.setHitboxPosition = function(pos) {
    this.hitbox.x = pos.x
    this.hitbox.y = pos.y;
  };
  this.refreshHitbox = function() {
    this.setHitboxPosition(this.position);
  };
  this.getInfo = function() {
    return 'pos ('+this.position.x+', '+this.position.y+')';
  };
  this.getRect = function(a) {
    var temp = new rectangle(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height + 1);
    return temp;
  };
  this.getCollision = function(b) {
    var sides = [0, 0, 0, 0]; //top left, top right, bottom right, bottom left
    if (b.collides(new rectangle(this.hitbox.x, this.hitbox.y, 1, 1))) sides[0] = 1;
    if (b.collides(new rectangle(this.hitbox.x + this.hitbox.width, this.hitbox.y, 1, 1))) sides[1] = 1;
    if (b.collides(new rectangle(this.hitbox.x + this.hitbox.width, this.hitbox.y + this.hitbox.y, 1, 1))) sides[2] = 1;
    if (b.collides(new rectangle(this.hitbox.x, this.hitbox.y + this.hitbox.y, 1, 1))) sides[3] = 1;
    return sides;
  };
};
