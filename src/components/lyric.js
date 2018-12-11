import React, { Component } from 'react';
import {toSec} from '../utils/time';
import {Carousel} from 'antd-mobile';
import styles from './lyric.scss';
class Lyric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            times:[],
            texts:[],
            current: 0,
            count:0
        }
    }
    initLryic(lyrics){
        let addArr = [];
        lyrics = lyrics.split('\n');
        console.log('yuanlyrics...', lyrics);
        lyrics = lyrics.filter(item=>item);
        lyrics = lyrics.map((item,index) => {
            let arr = item.split(']');
            if(!arr[1] && index < lyrics.length-2){
                for (let i=index+1,len=index+3; i<len; i++){
                    let temp = lyrics[i].split(']');
                    if (temp[1]){
                        arr[1] = temp[1];
                        break;
                    }
                }
                // arr[1] = '（音乐间幕）';
                return arr.join(']');
            }else if(arr[2] && arr[2].indexOf('[') === -1 && arr[1].indexOf('[') > -1){
                if(this.state.count == 0)this.state.count = index; 
                let newArr = [];
                newArr.push(arr[0]);
                newArr.push(arr[2]);
                addArr.push([arr[1],arr[2]].join(']'));
                return newArr.join(']');
            }else{
                return item;
            }
        })
        addArr.reverse();
        addArr.length > 0 && addArr.forEach(item => {
            lyrics.splice(this.state.count,0,item);
        })
        console.log(lyrics)
        this.formatLryic(lyrics);
    }
    formatLryic(lyrics){
        let times = [],
            texts = [];
        lyrics.forEach(item=>{
            let arr = item.replace('[', '').split(']');
            times.push(toSec(arr[0]));
            texts.push({
                time: toSec(arr[0]),
                text: arr[1]
            })
        })
        this.setState({
            times,
            texts
        })
        // console.log('times...', times, texts);
    }
    componentWillReceiveProps(nextProps, nextState){
        if (nextProps.lyric != this.props.lyric){
            this.initLryic(nextProps.lyric);
        }
        for (let i=0,len=this.state.times.length; i<len; i++){
            // console.log(nextProps.currentTime,this.state.times[i])
            if (nextProps.currentTime < this.state.times[i]){
                if (i-1 !== this.state.current){
                    this.setState({
                        current: i-1
                    });
                }
                break;
            }
        }
    }
    render() {
        let {
            show
        } = this.props;
        return (
            <Carousel
            selectedIndex={this.state.current}
            // autoplay={true}
            vertical={true}
            dots={false}
            autoplayInterval={500}
            className={show ? styles.showLyric : styles.lyric}
            >{
                this.state.texts.map((item, index)=>{
                    return <p key={index} className={this.state.current === index ? styles.active : ''}>{item.text}</p>
                })
            }</Carousel>
        );
    }
}

export default Lyric;