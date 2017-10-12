/*

Adds the spritesheet object to the global scope with the following functions
  getSprites() - provide a path, a size, and a callback for after the images loaded.
    The callback will be passes the array of images of the specified size.

*/

(function(state) {

  var loadImage = function(path, width, height, callback) {
    var img = document.createElement('img');
    img.onload = loaded;
    img.crossOrigin = 'anonymous';
    img.src = path;

    function loaded() {
      console.log('image loaded from '+path+' ('+img.width+', '+img.height+')')
      var ctx = document.getElementById('cvs').getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.moxImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      var tiles = splitSheet(img, width, height);
      callback(tiles);
    }
  };

  function splitSheet(sheet, width, height) {
    var tiles = [];

    var _canvas = document.createElement('canvas');
    _canvas.width = sheet.width;
    _canvas.height = sheet.height;
    var _ctx = _canvas.getContext('2d');
    _ctx.drawImage(sheet, 0, 0);

    var temp_canvas = document.createElement('canvas');
    temp_canvas.width=width;
    temp_canvas.height=height;
    var temp_ctx = temp_canvas.getContext('2d');

    for (var i=0; i<sheet.width/width; ++i)
      for (var j=0; j<sheet.height/height; ++j) {
        var data = _ctx.getImageData(i*width, j*height, width, height);
        temp_ctx.putImageData(data, 0, 0);
        var image = new Image();
        image.src = temp_canvas.toDataURL();
        tiles.push(image);
      }

    return tiles;
  }

  state.spritesheet = {
    getSprites: function(path, width, height, callback, self) {
      var img = document.createElement('img');
      img.onload = loaded;
      img.crossOrigin = 'anonymous';
      img.src = path;

      function loaded() {
        console.log('image loaded from '+path+' ('+img.width+', '+img.height+')')
        var ctx = document.getElementById('cvs').getContext('2d');
        ctx.webkitImageSmoothingEnabled = false;
        ctx.moxImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        //Multiply width and height for scaling
        var tiles = splitSheet(img, width, height);
        callback(tiles, self);
      }
    }
  };
})(this);
