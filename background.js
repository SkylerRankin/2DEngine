//background.js

/*
_layers - array of images for parallaxed backgrounds
_z - distance from back into the screen, z index; for relative speeds; should correspond to layers
*/

function background(_layers, _z, _width, _height) {
  this.layers = [];
  var loaded = function(bg, self) { self.layers.push(bg[0]); };
  for (var i=0; i<_layers.length; ++i)
    spritesheet.getSprites(_layers[i], _width, _height, loaded, this);
  this.z = _z || [0];
  this.getBackgroundLayer = function(n) {
    if (n) return { image: this.layers[n], z_index: this.z[n] };
  };
}
