const webcamElement = document.getElementById('webcam');
let net;
const classifier = knnClassifier.create();

const speakFun = (arg) => {
  var message = new SpeechSynthesisUtterance("class "+arg);
  message.lang = "en-US";
  speechSynthesis.speak(message);   
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

async function app() {
  net = await mobilenet.load();
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  const stream = await navigator.mediaDevices.getUserMedia({
      audio:false,
      video: {
          facingMode : 'environment'
      }
  })

  video.srcObject = stream

    console.log('Loading mobilenet..');

    console.log('Successfully loaded model');

    const addExample = async classId => {
      //const img = await webcam.capture();
      context.drawImage(video,0,0,500,500)
      const activation = net.infer(canvas, true);
  
      classifier.addExample(activation, classId);
  
    };
  
    document.getElementById('class-a').addEventListener('click', () => addExample(0));
    document.getElementById('class-b').addEventListener('click', () => addExample(1));
    document.getElementById('class-c').addEventListener('click', () => addExample(2));
  
    while (true) {
      if (classifier.getNumClasses() > 0) {
        //const img = await webcam.capture();
        context.drawImage(video,0,0,500,500)
        const activation = net.infer(canvas, 'conv_preds');
        const result = await classifier.predictClass(activation);
        
        const classes = ['A', 'B', 'C'];
                        
        let newresult = await net.classify(canvas);

        let probClassify = newresult[0].probability.toFixed(3)

        speakFun(classes[result.label])
        
        document.getElementById('text1').innerText = `
        prediction: ${classes[result.label]}\n
        `

        document.getElementById('text2name').innerText=`
        prediction: ${newresult[0].className}\n`

        document.getElementById('text2prob').innerText=`
        probability: ${probClassify}
        `;
      }
      await tf.nextFrame()
      wait(700)
      speechSynthesis.cancel() 
    }

  }

app();

if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("service-worker.js");
}

window.addEventListener('load', e => {
  registerSW(); 
});

async function registerSW() { 
  if ('serviceWorker' in navigator) { 
    try {
      await navigator.serviceWorker.register('./sw.js'); 
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.'); 
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden'); 
  }
}