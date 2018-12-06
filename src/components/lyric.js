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
            current: 0
        }
    }
    initLryic(lyrics){
        lyrics = lyrics.split('\n');
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
                return arr.join(']');
            }else{
                return item;
            }
        })
        // console.log('lyrics...', lyrics);
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
        console.log('times...', times, texts);
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
        return (
            <Carousel
            selectedIndex={this.state.current}
            // autoplay={true}
            vertical={true}
            dots={false}
            autoplayInterval={500}
            infinite
            className={styles.lyric}
            >{
                this.state.texts.map((item, index)=>{
                    return <p key={index} className={this.state.current === index ? styles.active : ''}>{item.text}</p>
                })
            }</Carousel>
        );
    }
}

export default Lyric;