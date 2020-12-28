function wait(ms){
var start = new Date().getTime();
var end = start;
while(end < start + ms) {
    end = new Date().getTime();
}
}

const speakFun = (arg) => {
    var message = new SpeechSynthesisUtterance(arg);
    message.lang = "en-US";
    speechSynthesis.speak(message);   
    }

async function app()
{
    const model = await mobilenet.load()
    
    const video = document.getElementById('video')
    const videoDisplayed = document.getElementById('videoDisplayed')
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    const stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video: {
            facingMode : 'environment'
        }
    })

    videoDisplayed.srcObject = stream
    video.srcObject = stream
    const status = document.getElementById("status") 

    while(true)
    {
        context.drawImage(video,0,0,250,250)
        var imgData = context.getImageData(0, 0, 250, 250)
        
        let r=0,g=0,b=0,n=imgData.data.length

        let ar = Array.from(imgData.data)

        for(let i=0;i<n;i++)
        if(i%4!=0)
        ar[i]/=255.0

        for(let i=0;i<n;i+=4)
        {
            r+=ar[i]
            g+=ar[i+1]
            b+=ar[i+2]
        }

        let mainMean = (r+g+b)/46875
        r/=15625
        g/=15625
        b/=15625

        let stdDev = 0

        for(let i=0;i<n;i++)
        {
            if(i%4!=0)
            stdDev+=((ar[i]-mainMean)*(ar[i]-mainMean))/46875
        }

        stdDev = Math.sqrt(stdDev)
        
        for(let i=0;i<n;i+=4)
        {
            ar[i] = (ar[i]-r)/stdDev
            ar[i+1] = (ar[i+1]-g)/stdDev
            ar[i+2] = (ar[i+2]-b)/stdDev
        }

        let max=-100,min=100
        for(let i=0;i<n;i++)
        if(i%4!=0)
        {
            if(max<ar[i])
            max=ar[i]
            if(min>ar[i])
            min=ar[i]
        }


        for(let i=0;i<n;i++)
        if(i%4!=0)
        {
            imgData.data[i] = ((((ar[i] - min)) / (max - min))) * 255
        }
        
        context.putImageData(imgData, 0, 0)
        const predictions = await model.classify(canvas)
        let str=predictions[0].className
        status.innerText = str + "-" + predictions[0].probability
        speakFun(str)
        wait(1000)
        await tf.nextFrame()
        speechSynthesis.cancel()
    }
}
app();
