Dropzone.options.fileupload = {
    maxFilesize: 50000,
    init: function() {
      this.on("uploadprogress", function(file, progress) {
        console.log("File progress", progress);
      });
      this.on('success', function( file, resp ){
      	console.log(resp);
    });
  },
}
