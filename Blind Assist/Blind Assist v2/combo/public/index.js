const webcamElement = document.getElementById('webcam');
let net;
const classifier = knnClassifier.create();
const center = document.getElementById("center")

const renderView = () => {
  let ar = JSON.parse(localStorage.getItem("classes"))
  let button
  for(let i=0;i<ar.length;i++)
  {
    button = document.createElement("button")
    button.id = "class"+i
    button.textContent = ar[i]
    center.appendChild(button)
  }
  window.ar = ar
  app()
}

const speakFun = (arg) => {
  var message = new SpeechSynthesisUtterance(arg);
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
  let classes = window.ar
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
  
    for(let i=0;i<classes.length;i++)
    {
      document.getElementById('class'+i).addEventListener('click', () => addExample(i));
    }
  
    while (true) {
      if (classifier.getNumClasses() > 0) {
        //const img = await webcam.capture();
        context.drawImage(video,0,0,500,500)
        const activation = net.infer(canvas, 'conv_preds');
        const result = await classifier.predictClass(activation);
                              
        let newresult = await net.classify(canvas);

        let probClassify = newresult[0].probability.toFixed(3)
        console.log(newresult[0])
        speakFun(classes[result.label])
        
        document.getElementById('text1').innerText = `
        prediction: ${classes[result.label]}\n
        `

        // document.getElementById('text2name').innerText=`
        // prediction: ${newresult[0].className}\n`

        // document.getElementById('text2prob').innerText=`
        // probability: ${probClassify}
        // `;
      }
      await tf.nextFrame()
      wait(700)
      speechSynthesis.cancel() 
    }

  }
