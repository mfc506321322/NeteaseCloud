import React, { Component } from "react";
import { connect } from "dva";
import styles from "./DistinguishPage.scss";
@connect(({play})=>{
  console.log('play..', play);
  return play
}, dispatch=>{
  return {

  }
})
class DistinguishPage extends Component {
  constructor() {
    super();
    this.state = {
      rightAnser: [],
      distiguishList:[],
      answers: new Array(10), // 用户选择的答案数组
      answerList: [], // 备选答案
      current: 0, // 当前播放歌曲
      isPlay: false, // 是否在播放
      progress: 0, // 当前播放进度
      tempTime: {
        // 播放时长
        start: 0,
        end: 0
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newProps = props.distiguishList || JSON.parse(window.localStorage.getItem('distiguishList'));
    return {
      rightAnser: newProps.map(item => item.name.name),
      distiguishList:newProps
    };
  }

  randomAnswer() {
    this.setState({
      answerList: this.state.rightAnser
    });
  }

  componentDidMount() {
    this.randomAnswer();
  }

  // 歌曲加载完，开始播放
  startPlay() {
    console.log("e...开始播放", this.refs.audio.duration);
    let start = Math.floor(Math.random() * (this.refs.audio.duration - 10));
    this.setState(
      {
        tempTime: {
          start,
          end: start + 10
        }
      },
      () => {
        // 把按钮的clss去掉
        [...document.querySelectorAll("ul button")].forEach(item => {
          item.className = item.className
            .replace(" error", "")
            .replace(" success", "");
        });
        this.refs.audio.pause();
        this.refs.audio.currentTime = start;
        this.refs.audio.play();
      }
    );
  }

  // 歌曲更新播放进度
  timeUpdate() {
    // console.log('1', this.refs.audio.currentTime, this.state.tempTime.end);
    if (this.refs.audio.currentTime > this.state.tempTime.end) {
      this.refs.audio.pause();
      if (this.state.current == 9) {
        // 全部播放完成
        console.log("this.answers...", this.state.answers);
      } else {
        this.setState(
          {
            current: (this.state.current + 1) % 10
          },
          () => {
            this.refs.audio.play();
          }
        );
      }
    }
    // 算一下进度
    this.setState({
      progress: Math.floor(
        ((this.refs.audio.currentTime - this.state.tempTime.start) / 10) * 100
      )
    });
  }

  get currentTime() {
    if (this.refs.audio && this.refs.audio.currentTime) {
      return (
        Math.floor(this.refs.audio.currentTime - this.state.tempTime.start) + ""
      ).padStart(2, "0");
    }
    return "00";
  }

  // 控制播放暂停
  play() {
    console.log('this.state.distiguishList...',this.state.distiguishList[this.state.current]);
    this.setState(
      {
        isPlay: !this.state.isPlay
      },
      () => {
        this.state.isPlay ? this.refs.audio.play() : this.refs.audio.pause();
      }
    );
  }

  // 猜歌
  answer(e) {
    // 已选过答案就不能再选择了
    if (this.state.answers[this.state.current]) {
      return;
    }
    // 判断是否点击按钮
    if (e.target != e.currentTarget) {
      let answer = e.target.innerText;
      let answers = [...this.state.answers];
      answers[this.state.current] = answer;
      // 把答案放入列表
      this.setState({
        answers
      });
      // 判断选对还是选错
      if (this.state.rightAnser[this.state.current] == answer) {
        e.target.className += " success";
      } else {
        e.target.className += " error";
      }
    }
  }

  render() {
    return <React.Fragment>
      {this.state.distiguishList && <div className={styles.distinguish}>
        <div className={styles.fuzzy} style={{
          backgroundImage:`url(${this.state.distiguishList[this.state.current].name.al.picUrl})`,
          backgroundPosition:'center center',
          backgroundSize:'cover',
          filter: 'blur(10px)'
        }}></div>
        <div className={styles.header}>
          <a href="javascript:history.back();">
            <img src="./icon/back.png" alt="" />
          </a>
          <h1>听歌识曲游戏</h1>
          <div className={styles.basis} />
        </div>
        <div className={styles.main}>
          <ul onClick={this.answer.bind(this)}>
            {this.state.answerList.map(item => {
              return (
                <button className={styles.answer} key={item}>
                  {item}
                </button>
              );
            })}
          </ul>
          {/* 进度条 */}
          <div className={styles.progressbox}>
            <span>{"00:" + this.currentTime}</span>
            <div className={styles.progress}>
              <p ref="progress">
                <span style={{ width: this.state.progress + "%" }} />
              </p>
            </div>
            <span>00:10</span>
          </div>
          <div className={styles.playbox}>
            <span>{`${this.state.current + 1}/10`}</span>
            <button onClick={this.play.bind(this)}>
              {this.state.isPlay ? "暂停" : "播放"}
            </button>
          </div>
          {/* 音频播放器 */}
          <audio
            crossOrigin="anonymous"
            src={this.state.distiguishList[this.state.current].url}
            ref="audio"
            onTimeUpdate={() => this.timeUpdate()}
            onLoadedMetadata={() => this.startPlay()}
          />
          <ul className={styles.list}>
            <h2>猜歌结果</h2>
            {this.state.answers.map((item, index) => {
              return (
                <li key={index}>
                  <span>{index + 1}</span>
                  <span>答案：{item}</span>
                  <span>
                    {item == this.state.rightAnser[index] ? "猜对" : "猜错"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>}
    </React.Fragment>
  }
}

export default DistinguishPage;