let mobilenet;
let classifier;
let video;
let label = 'loading model';
let class1;
let class2;
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
}

// function customModelReady() {
//   console.log('Custom Model is ready!!!');
//   label = 'model ready';
//   classifier.classify(gotResults);
// }

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  class1 = createButton('class1');
  class1.mousePressed(function() {
    classifier.addImage('class1');
  });

  class2 = createButton('class2');
  class2.mousePressed(function() {
    classifier.addImage('class2');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
    
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result[0].label;
    classifier.classify(gotResults);
  }
}




















// let mobilenet;
// let video;
// let label = '';

// function modelReady() {
//   console.log('Model is ready!!!');
//   mobilenet.predict(gotResults);
// }

// function gotResults(error, results) {
//   if (error) {
//     console.error(error);
//   } else {
//     //console.log(results);
//     label = results[0].className;
//     mobilenet.predict(gotResults);
//   }
// }

// // function imageReady() {
// //   image(puffin, 0, 0, width, height);
// // }

// function setup() {
//   createCanvas(640, 550);
//   video = createCapture(VIDEO);
//   video.hide();
//   background(0);
//   mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
// }

// function draw() {
//   background(0);
//   image(video, 0, 0);
//   fill(255);
//   textSize(32);
//   text(label, 10, height - 20);
// }