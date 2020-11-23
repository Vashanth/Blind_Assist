const webcamElement = document.getElementById('webcam');
let net;
const classifier = knnClassifier.create();

// async function app() {
//   console.log('Loading mobilenet..');

//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Successfully loaded model');

//   // Make a prediction through the model on our image.
//   const imgEl = document.getElementById('img');
//   const result = await net.classify(imgEl);
//   console.log(result);
// }

// async function app() {
//     console.log('Loading mobilenet..');
  
//     // Load the model.
//     net = await mobilenet.load();
//     console.log('Successfully loaded model');
    
//     // Create an object from Tensorflow.js data API which could capture image 
//     // from the web camera as Tensor.
//     const webcam = await tf.data.webcam(webcamElement);
//     while (true) {
//       const img = await webcam.capture();
//       const result = await net.classify(img);
  
//       document.getElementById('console').innerText = `
//         prediction: ${result[0].className}\n
//         probability: ${result[0].probability}
//       `;
//       // Dispose the tensor to release the memory.
//       img.dispose();
  
//       // Give some breathing room by waiting for the next animation frame to
//       // fire.
//       await tf.nextFrame();
//     }
//   }

async function app() {
    console.log('Loading mobilenet..');

    net = await mobilenet.load();
    console.log('Successfully loaded model');

    const webcam = await tf.data.webcam(webcamElement);

    const addExample = async classId => {
      const img = await webcam.capture();
      const activation = net.infer(img, true);
  
      classifier.addExample(activation, classId);
  
      img.dispose();
    };
  
    document.getElementById('class-a').addEventListener('click', () => addExample(0));
    document.getElementById('class-b').addEventListener('click', () => addExample(1));
    document.getElementById('class-c').addEventListener('click', () => addExample(2));
  
    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();

        const activation = net.infer(img, 'conv_preds');
        const result = await classifier.predictClass(activation);
        
        const classes = ['A', 'B', 'C'];

        let newresult = await net.classify(img);
        console.log(newresult[0])


        document.getElementById('text').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
        prediction: ${newresult[0].className}\n
        probability: ${newresult[0].probability}
        `;
        img.dispose();
      }
  
      await tf.nextFrame()
    }

  }

app();