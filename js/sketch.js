var webcamVideo;
var webcamCanvas;
var r, g, b;

function setup() {
    webcamCanvas = createCanvas(0, 0);
    webcamCanvas.id("webcam-canvas");
    background(0);
    webcamVideo = createCapture(VIDEO);
    webcamVideo.size(width, height);
    webcamVideo.hide();
}

function draw() {
     r = random(0,255);
     g = random(0,255);
     b = random(0,255);
     tint(r,g,b);
    image(webcamVideo, 0, 0);
}

function resize(w, h)
{
    resizeCanvas(w, h);
    webcamVideo.size(width, height);
    console.log(w + " " + h);
}