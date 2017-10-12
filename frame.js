//frame.js

/*

function to draw the background according to a focus point

*/

function frame(_view_width, _view_height, _total_width, _total_height, _offset_x, _offset_y) {

  this.view_width = _view_width;
  this.view_height = _view_height;
  this.total_width = _total_width;
  this.total_height = _total_height;
  this.offset_x = _offset_x || 0;
  this.offset_y = _offset_y || 0;
  this.relative_focus = {x: this.view_width - this.offset_x, y: this.view_height - this.offset_y};

  this.absolute_focus = this.relative_focus;

  //sets absolute_focus, presumably the player's position
  this.setFocus = function(x, y) {
    this.absolute_focus = {x: x, y: y};
     if (x - (this.offset_x) > 0 && (x + (this.offset_x)) < this.total_width)
      this.absolute_focus.x = x;
     if ((y - (this.offset_y)) > 0 && (y + (this.offset_y)) < this.total_height)
      this.absolute_focus.y = y;
  };

  this.drawBackground = function(ctx, background, scale) {
    ctx.clearRect(0, 0, this.view_width, this.view_height);
    for (var i=0; i<background.layers.length; ++i)
      if (background.layers[i])
        ctx.drawImage(background.layers[i], 0 - this.absolute_focus.x + this.offset_x, 0 - this.absolute_focus.y + this.offset_y, this.total_width*1, this.total_height*1);
  };

  this.drawPath = function(ctx, path, color) {
    if (!path) return;
    ctx.fillStyle = color || '#006aff';
    for (var i=0; i<path.length; ++i)
      if (path[i] == 1)
        ctx.fillRect(i%6000 - this.absolute_focus.x + this.offset_x, Math.floor(i/6000) - this.absolute_focus.y + this.offset_y,  1, 1);
  }

  this.drawEntities = function(ctx, entities) {
    for (var i=0; i<entities.length; ++i)
      entities[i].animator.drawFrame(ctx, entities[i].position.x - this.absolute_focus.x + this.offset_x, entities[i].position.y - this.absolute_focus.y + this.offset_y);
  };
}
