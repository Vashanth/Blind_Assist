import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';
import outputs from './Output.json';
import _ from 'lodash';
import Tts from 'react-native-tts';


let _currentInstant = 0;
export default class App extends Component {
  state = {
    time:0,
    output:"",
    speakerData:""
  }

componentDidMount() {
  setInterval(() => this.speakFun(), 2000);
}

speakFun = () => {
  Tts.speak(this.state.speakerData)
}

processOutput({data}) {
    const probs = _.map(data, item => _.round(item/255.0, 0.02));
    const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0]/255.0, 2), item[1]]).value();
    const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${item[0]}`).join('\n').value();
    const speakerData = _.chain(orderedData).take(1).map(item => `${item[1]}`).join('').value();
    const output = `Guesses:\n${outputData}\n`;
    this.setState({output,speakerData});
    _currentInstant = Date.now();
  }
  
  render() {
    const modelParams = {
      file: "mobilenet_v1_1.0_224_quant.tflite",
      inputDimX: 224,
      inputDimY: 224,
      outputDim: 1001,
      freqms: 0
    };
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
                this.camera = ref;
              }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onModelProcessed={data => this.processOutput(data)}
            modelParams={modelParams}
        >
          <Text style={styles.cameraText}>{this.state.output}</Text>
        </RNCamera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});