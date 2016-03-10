Dropzone.options.fileupload = {
  paramName: 'file',
  maxFilesize: 10000, // MB
  maxFiles: 1,
  dictDefaultMessage: 'drop files here',
  headers: {
    'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
  },
  init: function() {
    this.on('success', function( file, resp ){
      console.log( file );
      console.log( resp );
    });
    this.on('thumbnail', function(file) {
      if ( file.width < 640 || file.height < 480 ) {
        file.rejectDimensions();
      }
      else {
        file.acceptDimensions();
      }
    });
  },
  accept: function(file, done) {
    file.acceptDimensions = done;
    file.rejectDimensions = function() {
      done('The image must be at least 640 x 480px')
    };
  }
};