Dropzone.autoDiscover = false;
var errors = false;
var myDropzone = new Dropzone("#fileupload" , {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 100000, // MB

  error: function(file, errorMessage) {
    errors = true;
    console.log('error')
  },
  queuecomplete: function() {
    console.log('queuecomplete');
    alert('Successflly Uplaoded');
  },

  dictDefaultMessage :
  '<span class="bigger-150 bolder"><i class="ace-icon fa fa-caret-right red"></i> Drop files</span> to upload \
  <span class="smaller-80 grey">(or click)</span> <br /> \
  <i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>',
});