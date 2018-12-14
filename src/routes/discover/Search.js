import React, { Component } from 'react';
import styles from './Search.scss'
import {NavLink} from 'dva/router';
import {connect} from 'dva';
@connect(
    state => {
        let {searchData} = state.index
        return {
            searchData
        }
    },
    dispatch => {
        return {
            searchVal:(val) => {
                dispatch({
                    type:'index/searchVal',
                    val
                })
            },
            playAll:(payload) => {
                dispatch({
                    type:'play/playAll',
                    payload
                })
            },
            distinguishSong:(payload) => {
                dispatch({
                    type:'play/distinguishSong',
                    payload
                })
            }
        }
    }
)
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val:''
        }
    }
    search = () => {
        let {
            val
        } = this.state;
        if(val.trim() !== ''){
            this.props.searchVal(val);
            window._hmt.push(['_trackEvent', '网易云音乐搜索页', 'input框失焦', '搜索歌曲']);
        }
    }
    getAll = () => {
        let {
            searchData
        } = this.props;
        let arr = searchData.map(item => item.id);
        this.props.playAll(arr);
        window._hmt.push(['_trackEvent', '网易云音乐搜索页', '点击事件', '播放全部歌曲']);
    }
    // 听歌识曲
    distinguishSong = () => {
        this.props.distinguishSong(this.props.searchData.map(item=>item.id));
        window._hmt.push(['_trackEvent', '网易云音乐搜索页', '点击事件', '听歌识曲']);
    }
    render() {
        let {
            val
        } = this.state;
        let {
            searchData
        } = this.props;
        return (
            <div className={styles.search}>
                <header className={styles.header}>
                    <label>
                        <input type="text" className={styles.search}
                        placeholder="猜你喜欢 浮生" value={val} onChange={(e) => {
                            this.setState({
                                val:e.target.value
                            })
                        }} onBlur={this.search}/>
                    </label>
                    <a href="javascript:history.back();">取消</a>
                </header>
                <div className={styles.content}>
                    <div className={styles.ul}>
                        {
                            searchData.length > 0 && <div className={styles.li}>
                                <div className={styles.getAll}>
                                    <h3 onClick={this.getAll}>播放全部</h3>
                                    <h3 onClick={this.distinguishSong}>识曲游戏</h3>
                                </div>
                            </div>
                        }
                        {
                            searchData.length > 0 && searchData.map((v,i) => {
                                return <div className={styles.li} key={i}>
                                    <NavLink 
                                    to={`/music/${v.id}`}
                                    onClick={() => {
                                        window._hmt.push(['_trackEvent', '网易云音乐搜索页', '点击事件', '点击播放歌曲']);
                                    }}>
                                        <h3>{v.name}</h3>
                                        <span>{v.artists[0].name} - {v.album.name}</span>
                                    </NavLink>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;