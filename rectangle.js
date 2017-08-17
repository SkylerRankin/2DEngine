function rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.setPosition = function(pos) {
    this.x = pos.x;
    this.y = pos.y
  }
  this.info = function() {
    return 'x='+this.x+' y='+this.y+' w='+this.width+' h='+this.height
  }
  this.intersects = function(rec) {
    var sides = {};
    if (this.x.isBetween(rec.x, rec.x+rec.width)) sides.left = true;
    if ((this.x+this.width).isBetween(rec.x, rec.x+rec.width)) sides.right = true;
    if (this.y.isBetween(rec.y, rec.y+rec.height)) sides.top = true;
    if ((this.y+this.height).isBetween(rec.y, rec.y+rec.height)) sides.bottom = true;

    if (sides.left || sides.right && (sides.top || sides.bottom))
      return sides;
    return false;
  };
};

Number.prototype.isBetween = function(a, b) {
  return (this >= a && this <= b)
};
