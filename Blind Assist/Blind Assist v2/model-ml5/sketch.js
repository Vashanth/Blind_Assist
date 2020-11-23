let mobilenet;
let video;
let label = '';

function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(gotResults);
}

const gotResults = (err,res) => {
  if(err)
  {
    console.log(err)
  }
  else
  {
    label = res[0].className
    mobilenet.predict(gotResults)
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.elt.setAttribute('playsinline', '');
  video.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}