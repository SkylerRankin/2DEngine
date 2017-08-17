function boundary(url) {

  var image_loaded = false;
  var path = [];
  var img = document.createElement('img');
  img.onload = loaded;
  img.crossOrigin = 'anonymous';
  img.src = url;

  function loaded() {
    var _canvas = document.createElement('canvas');
    _canvas.width = img.width;
    _canvas.height = img.height;
    var _ctx = _canvas.getContext('2d');
    _ctx.drawImage(img, 0, 0);
    console.log('boundary img loaded');

    var raw = _ctx.getImageData(0, 0, img.width, img.height).data;
    var data = [];
    for (var i=0; i<raw.length; i+=4) {
      data.push({
        r: raw[i],
        g: raw[i+1],
        b: raw[i+2]
      });
    };

    for (var i=0; i<data.length; i++) {
      if (data[i].r < 100 && data[i].g < 100 && data[i].b < 100) path.push(1);
      else path.push(0);
    }
    image_loaded = true
  }

  this.draw = function(ctx) {
    ctx.drawImage(img, 0, 0);
  };

  this.drawPath = function(ctx, color) {
    if (!image_loaded) return;
    ctx.fillStyle = color || '#006aff';
    ctx.beginPath();
    for (var i=0; i<path.length; ++i)
    if (path[i] == 1)
      ctx.fillRect(i%img.width, Math.floor(i/img.width),  1, 1);
    ctx.closePath();
  };

  this.collides = function(r) {
    if (r.x < 0 || r.x >= img.width || r.y < 0 || r.y >= img.height) return false;
    var x0 = Math.floor(r.x), y0 = Math.floor(r.y), x1 = x0+Math.floor(r.width), y1 = y0+Math.floor(r.height);
    for (var i=x0; i<=x1; ++i)
      for (var j=y0; j<=y1; ++j) {
        if (path[j*img.width + i] === 1) return true;
      }
    return false;
  };

}
