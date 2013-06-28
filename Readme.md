
# xhr-image

  XHR-driven `Image` for progress events to make pretty progress indicators when loading images.

## Installation

  Install with [component(1)](http://component.io):

    $ component install component/xhr-image

## Example

```js
var XHRImage = require('xhr-image');

var img = new XHRImage('http://i.cloudup.com/0chKjveyrS.png');

img.on('progress', function(e){
  progress.style.width = (e.percent | 0) + '%';
});

img.on('load', function(){
  var el = new Image;
  el.src = URL.createObjectURL(img.xhr.response);
  document.body.appendChild(el);
});
```

## Events

 - `open`
 - `sent`
 - `receiving`
 - `load`
 - `progress`

## API

### Image(src)

  Request the given img `src`.

### .xhr

  The XHR request.

### .abort()

  Abort the request.

## License

  MIT
