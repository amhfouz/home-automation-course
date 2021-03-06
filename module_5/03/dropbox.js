// Modules
var Dropbox = require('dropbox');
var fs = require('fs');
var NodeWebcam = require( "node-webcam" );
var rpio = require('rpio');

// Init rpio
var options = {
  mapping: 'gpio'
}
rpio.init(options); 

// Webcam
var opts = {
    width: 1280,
    height: 720,
    delay: 0,
    quality: 100,
    output: "jpeg",
    device: false,
    verbose: true
}
 
var Webcam = NodeWebcam.create( opts );

// Token
var ACCESS_TOKEN = "";

// Dropbox object
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

// Check pin
setInterval(function() {

  rpio.open(18, rpio.INPUT);
  if (rpio.read(18) == 1) {

    // Take picture
    var pictureName = ( new Date() ).toISOString() + '.jpg';
    Webcam.capture( pictureName, function(location) {
     
        console.log( "Image created!" );

        fs.readFile( __dirname + '/' + pictureName, function (err, file) {
          if (err) {
            throw err; 
          }

          // Upload
          dbx.filesUpload({path: '/' + pictureName, contents: file}, function (err, response) {

            console.log(err);
            console.log(response);

          });

        });

    });

  }

}, 2000);
