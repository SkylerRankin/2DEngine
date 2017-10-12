// level.js
/*
var entities = [];
var boundary;
var background;
var frame;
*/
var level = function(params) {
  this.name = params.name || 'unnamed level';
  this.boundary = new boundary(params.boundary);
  this.entities = params.entities;
  this.background = new background(params.backgrounds, params.backgrounds_z, params.background_width, params.background_height);
  this.frame = new frame(params.view_width, params.view_height, params.total_width, params.total_height, params.offset_x || 0, params.offset_y || 0);
  if (params.update) this.update = params.update;
  if (params.draw) this.draw = params.draw;
  console.log(this.name +' created');
};
