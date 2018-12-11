import React, { Component } from "react";
import styles from "./AudioCable.scss";

class AudioCable extends Component {
  constructor(props) {
    super(props);
    this.hasAudio = false;
  }

  componentWillReceiveProps(nextProps) {
    // console.log('audio props...', nextProps.audio)
    if (nextProps.audio && !this.hasAudio) {
      console.log("audio props...", nextProps.audio);
      this.hasAudio = true;
      this.drawLine(nextProps.audio);
    }
  }

  componentDidMount() {
    // console.log(this.props.audio);
    // this.drawLine(this.props.audio);
  }

  drawLine(audio) {
    var canvas = this.refs.canvas;
    // var AudioContext = AudioContext || webkitAudioContext;
    var context = new AudioContext();
    //从元素创建媒体节点
    var media = context.createMediaElementSource(audio);
    //创建脚本处理节点
    var processor = context.createScriptProcessor(4096, 1, 1);
    //Canvas初始化
    var width = canvas.width,
      height = canvas.height;
    var g = canvas.getContext("2d");
    g.translate(0.5, height / 2 + 0.5);
    //连接：媒体节点→控制节点→输出源
    media.connect(processor);
    processor.connect(context.destination);
    //控制节点的过程处理
    processor.onaudioprocess = function(e) {
      //获取输入和输出的数据缓冲区
      var input = e.inputBuffer.getChannelData(0);
      var output = e.outputBuffer.getChannelData(0);
      // console.log('input...', input, 'output...', output);
      //将输入数缓冲复制到输出缓冲上
      let isZero = false;
      for (var i = 0; i < input.length; i++) {
        output[i] = input[i];
        isZero += Math.abs(output[i]);
      }
      if (isZero) {
        //将缓冲区的数据绘制到Canvas上
        g.clearRect(-0.5, -height / 2 - 0.5, width, height);
        g.beginPath();
        for (var i = 0; i < width; i++)
          g.lineTo(i, (height / 2) * output[((output.length * i) / width) | 0]);
        g.strokeStyle = "#fff"
        g.lineWidth=1;
        g.stroke();
      }
      /* if (isZero > 400){
          console.log('高分贝')
      }else{
          console.log('低分贝');
      }
      console.log('isZero...', isZero); */
    };
  }

  render() {
    return (
      <canvas className={styles.canvas} width="150" height="150" ref="canvas" />
    );
  }
}

export default AudioCable;
