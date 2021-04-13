var webcamVideo;
var webcamCanvas;
var slider;
var seriously, src, target;
var r, g, b;

function setup() {
    webcamCanvas = createCanvas(600, 400, WEBGL);
    webcamCanvas.id("webcam-canvas");
    background(0);

    // slider = createSlider(0, 1, 0.5, 0.01);
    // slider.id('effectSlider');

    $("#webcam-canvas").hide();
}

function draw() {
    // r = random(254,255);
    // g = random(254,255);
    // b = random(254,255);
    // tint(r,g,b);
    // image(webcamVideo, 0, 0);
}

function showCamera(){
    webcamVideo = createCapture(VIDEO);
    webcamVideo.size(width, height);
    webcamVideo.hide();
    webcamVideo.id("webcam-source");

    seriously = new Seriously();
    src = seriously.source("#webcam-source");
    target = seriously.target("#webcam-canvas");

    //kaleidoscope(6, 0);
    nv();

    seriously.go();
}

function stopCamera()
{
    //webcamVideo.pause();
    //webcamVideo.stop();

    if (navigator.getUserMedia) {
        var elt = document.createElement('video');
        var constraints;
        var useVideo = true;
        var useAudio = false;

        if (!constraints) {
          constraints = {video: useVideo, audio: useAudio};
        }
  
        navigator.getUserMedia(constraints, function(stream) {
            stream.getTracks().forEach(function(track) {
                track.enabled = false;
                track.muted = true;
                track.stop();
                console.log(track);
            });
        }, function(e) { console.log(e); });
    }


    console.log(webcamVideo);
    console.log("camera shutdown");
}

function resize(w, h)
{
    $("#webcam-canvas").show();
    resizeCanvas(w, h);
    webcamVideo.size(width, height);
    console.log(w + " " + h);
}

function kaleidoscope(seg, offset)
{
    var kalei = seriously.effect("kaleidoscope");
    kalei.segments = seg;
    kalei.offset = offset;
    kalei.source = src;
    target.source = kalei;
}

function nv()
{
    var nv = seriously.effect("nightvision");
    // nv.amount = slider.value();
    nv.source = src;
    target.source = nv;
}