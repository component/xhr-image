/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `Image`.
 */

module.exports = Image;

/**
 * Initialize an `Image` with `src`.
 *
 * @param {String} src
 * @api public
 */

function Image(src) {
  if (!src) throw new TypeError('src required');
  this.xhr = new XMLHttpRequest;
  this.xhr.open('GET', src, true);
  this.xhr.responseType = 'blob';
  this.xhr.onprogress = this.onprogress.bind(this);
  this.xhr.onreadystatechange = this.onchange.bind(this);
  this.xhr.send();
}

/**
 * Mixin emitter.
 */

Emitter(Image.prototype);

/**
 * Abort the request.
 *
 * @api public
 */

Image.prototype.abort = function(){
  this.xhr.abort();
};

/**
 * Handle progress.
 * https://developer.mozilla.org/es/docs/XMLHttpRequest/Usar_XMLHttpRequest#Monitoring_progress
 */

Image.prototype.onprogress = function(e){
  if (!e.lengthComputable) return;
  e.percent = e.loaded / e.total * 100;
  
  this.emit('progress', e);
};

/**
 * Handle state changes.
 */

Image.prototype.onchange = function(){
  var state = this.xhr.readyState;

  switch (state) {
    case 1:
      this.emit('open');
      break;
    case 2:
      this.emit('sent');
      break;
    case 3:
      this.emit('receiving');
      break;
    case 4:
      this.emit('load');
      break;
  }
};
