/*

Captures the keystrokes/mouse presses for a frame, used to pass into the update function in loop.js

*/

(function(state) {

  var keys = {
    w: 0,
    s: 0,
    a: 0,
    d: 0,
    space: 0,
    right_click: 0,
    left_click: 0
  };

  state.keyboard = {

    getKeys: function() {
      return keys;
    },

    reset: function() {
      keys = {
        w: 0,
        s: 0,
        a: 0,
        d: 0,
        space: 0,
        right_click: 0,
        left_click: 0
      };
    },
  }

  window.addEventListener('keydown', function(e) {
    if (keys.hasOwnProperty(String.fromCharCode(e.keyCode).toLowerCase()))
      keys[String.fromCharCode(e.keyCode).toLowerCase()] = 1;
    else
      switch (e.keyCode) {
        case 32:
          keys.space = 1; break;
        case 16:
          keys.shift = 1; break;
        case 27:
          keys.esc = 1; break;
      }
  });

  window.addEventListener('mousedown', function(e) {
    if (e.which == 1) keys.left_click = 1;
    else keys.right_click = 1;
  });

  window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

})(this);
