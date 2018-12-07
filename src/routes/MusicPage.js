import React, { Component } from 'react';
import {connect} from 'dva';
import styles from './MusicPage.scss';
import {formatTime} from '../utils/time';
import Lyric from '../components/lyric';
let storage = window.localStorage;
@connect(
    state => {
        let {
            musicDetailData,
            songUrl,
            songsDetailAll,
            lyric
        } = state.play;
        // console.log('musicDetailData...',musicDetailData);
        // console.log('songsDetailAll...',songsDetailAll);
        return {
            musicDetailData,
            songUrl,
            songsDetailAll,
            lyric
        }
    },
    dispatch => {
        return {
            getMusicDetail:(id) => {
                dispatch({
                    type:'play/getMusicDetail',
                    id
                })
            },
            getSong:(id) => {
                dispatch({
                    type:'play/getSong',
                    id
                })
            },
            getSwitchPlay:(payload) => {
                dispatch({
                    type:'play/getSwitchPlay',
                    payload
                })
            },
            musicListChange:(payload) => {
                dispatch({
                    type:'play/musicListChange',
                    payload
                })
            },
            getLyrics:(payload) => {
                dispatch({
                    type:'play/getLyrics',
                    payload
                })
            }
        }
    }
)
class MusicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            isPlay:true,
            show:false
        }
    }
    componentDidMount(){
        this.props.getMusicDetail(this.props.match.params.id);
        console.log('match.params.id...',this.props.match.params.id);
        this.props.getSong(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.musicDetailData.id !== this.props.musicDetailData.id){
            nextProps.musicDetailData.id && this.props.getLyrics(nextProps.musicDetailData.id);
        }
    }
    /* shouldComponentUpdate(){
        let flag = musicListHistory.some(v => {
            return v.id === this.props.musicDetailData.id;
        })
        !flag && Object.keys(this.props.musicDetailData).length>0 && musicListHistory.push(this.props.musicDetailData);

        return true;
    } */
    timeUpdate = () => {
        let progress = this.getTime.currentTime/this.getTime.duration*100;
        // console.log(progress);
        this.setState({
            progress
        },() => {
            if(progress == 100){
                let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll')) || this.props.songsDetailAll;
                songsDetailAll ? this.switchPlay('next') : this.setState({
                    isPlay:false
                });
            }
        })
    }
    changeMusicPlay = () => {
        let {
            isPlay
        } = this.state;
        isPlay ? this.getTime.play() : this.getTime.pause();
    }
    changePlay = () => {
        let {
            isPlay
        } = this.state;
        this.setState({
            isPlay:!isPlay
        },() => {
            this.changeMusicPlay();
        })
    }
    //获取总时长
    get allTime(){
        if (this.getTime && this.getTime.duration){
            return formatTime(this.getTime.duration);
        }
        return '00:00';
    }
    // 获取当前播放时间
    get nowTime(){
        if (this.getTime && this.getTime.currentTime){
            return formatTime(this.getTime.currentTime);
        }
        return '00:00';
    }
    touchStart = () => {
        this.setState({
            isPlay:false
        },() => {
            this.changeMusicPlay();
        })
    }
    touchMove = (e) => {
        let touchX = e.touches[0].pageX;
        let ProgressL = this.getProgress.offsetLeft;
        let ProgressW = this.getProgress.offsetWidth;
        let newProgress = (touchX - ProgressL) / ProgressW;
        if(newProgress > 1){
            newProgress = 1;
        }else if(newProgress < 0){
            newProgress = 0;
        }
        this.setState({
            progress: newProgress * 100
        },() => {
            this.getTime.currentTime = newProgress * this.getTime.duration;
        })
    }
    touchEnd = () => {
        this.setState({
            isPlay:true
        },() => {
            this.changeMusicPlay();
        })
    }

    switchPlay = (type) => {
        let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll')) || this.props.songsDetailAll;
        let flag = songsDetailAll.some(item => {
            return item.id === this.props.musicDetailData.id;
        })
        flag && songsDetailAll.length > 0 && this.setState({
            isPlay:true
        },() => {
            this.props.getSwitchPlay(type);
        })
    }

    render() {
        let {
            isPlay,
            progress,
            show
        } = this.state;
        let {
            musicDetailData,
            lyric
        } = this.props;
        let v = {...musicDetailData};
        // console.log('v...',v);
        let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll')) || this.props.songsDetailAll;
        return (
            <React.Fragment>
                <div className={ show ? styles.musicList : styles.musicDown}>
                    <header className={styles.listHeader}>
                        <img src="/img/icon/back.png" alt=""
                        onClick={() => {
                            this.setState({
                                show:false
                            })
                        }}/>
                        <h4>歌单</h4>
                        <div className={styles.basis}></div>
                    </header>
                    <div className={styles.content}>
                        <div className={styles.ul}>
                            {
                                songsDetailAll.length > 0 && songsDetailAll.map((val,i) => {
                                    return <div className={styles.li} key={i}
                                    onClick={() => {
                                        this.props.musicListChange(val.id);
                                        this.setState({
                                            show:false
                                        })
                                    }}>
                                        <div className={styles.musicBox}>
                                            <h3>{val.name}</h3>
                                            <span>{val.ar[0].name} - {val.al.name}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                {
                Object.keys(v).length>0 &&<div className={styles.musicPage}
                style={{
                    backgroundImage:`url(${v.al.picUrl})`,
                    backgroundPosition:'center center',
                    backgroundSize:'cover'
                }}>
                            <header className={styles.header}>
                                <a href="javascript:history.back();">
                                    <img src="/img/icon/back.png" alt=""/>
                                </a>
                                <h4>{v.name}</h4>
                                <div className={styles.basis}></div>
                            </header>
                            <div className={styles.main}>
                                <div className={styles.img}>
                                    <img 
                                    src={v.al.picUrl} 
                                    className={isPlay ? '' : styles.pause}
                                    alt=""/>
                                </div>
                                <Lyric lyric={lyric} currentTime={this.getTime && this.getTime.currentTime}></Lyric>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.time}>
                                    <span className={styles.nowTime}>{this.nowTime}</span>
                                    <div className={styles.progressTime}
                                    onTouchStart={this.touchStart}
                                    onTouchMove={this.touchMove}
                                    onTouchEnd={this.touchEnd}
                                    ref={ref => this.getProgress = ref}
                                    >
                                        <div className={styles.progressBox}>
                                            <span style={{
                                                width:`${progress}%`
                                            }}></span>
                                        </div>
                                    </div>
                                    <span className={styles.allTime}>{this.allTime}</span>
                                </div>
                                <div className={styles.musicBtn}>
                                    <div className={styles.basis}></div>
                                    <img 
                                    src="/img/icon/go_back.png" 
                                    alt=""
                                    onClick={() => {
                                        this.switchPlay('prev')
                                    }}/>
                                    <img 
                                    src={isPlay ? "/img/icon/pause.png" : "/img/icon/play.png"} 
                                    className={styles.play} 
                                    alt=""
                                    onClick={this.changePlay}/>
                                    <img 
                                    src="/img/icon/go.png" 
                                    alt=""
                                    onClick={() => {
                                        this.switchPlay('next')
                                    }}/>
                                    <img 
                                    src="/img/icon/musicList.png" 
                                    alt=""
                                    onClick={() => {
                                        this.setState({
                                            show:true
                                        })
                                    }}
                                    />
                                </div>
                            </div>
                    {this.props.songUrl?<audio 
                    src={this.props.songUrl} 
                    autoPlay
                    ref={ref => this.getTime = ref} 
                    onTimeUpdate={this.timeUpdate}></audio>:null}
                </div>
                }
            </React.Fragment>
        );
    }
}

export default MusicPage;