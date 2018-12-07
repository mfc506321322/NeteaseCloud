import { routerRedux } from 'dva/router';
import {
  getMusicDetail,
  getSong,
  playDetailAll,
  playSongsAll,
  getLyric
} from '../services/index';
let storage = window.localStorage;
export default {
  namespace: "play",
  state: { 
    musicDetailData:{},
    songUrl:'',
    songsUrlAll:[],
    songsDetailAll:[],
    current:0
  },
  effects: {
    *getMusicDetail(action, {call, put}){
      console.log('actionDetail...', action);
      let response = yield call(getMusicDetail,action.id);
      let res = yield call(getLyric,action.id)
      // console.log('res...', res.data.lrc.lyric);
      yield put({
        type: 'getMusicDetailData',
        payload: response.data.songs[0]
      });
      yield put({
        type: 'getLyricData',
        payload: res.data.lrc.lyric
      });
    },
    *getSong(action, {call, put}){
      console.log('action...', action);
      let response = yield call(getSong,action.id);
      // console.log('response.song...', response.data.data[0].url);
      yield put({
        type: 'getSongs',
        payload: response.data.data[0].url
      });
    },
    *playAll(action, {call, put}){
      // console.log('action...', action);
      let response = yield call(playDetailAll,action.payload);
      let res = yield call(playSongsAll,action.payload);
      // console.log('response.AllSong...', response.data.songs);
      // console.log('res.AllSong...', res.data.data);
      storage.setItem('songsDetailAll',JSON.stringify(response.data.songs));
      storage.setItem('songsAll',JSON.stringify(res.data.data));
      yield put({
        type: 'getSongsDetailAll',
        payload: response.data.songs
      });
      yield put({
        type: 'getSongsAll',
        payload: res.data.data
      });
      yield put(routerRedux.push({
        pathname: `/music/${response.data.songs[0].id}`
      }))
    },
    *getLyrics(action, {call, put}){
      console.log('actionLyric...', action);
      let res = yield call(getLyric,action.payload)
      // console.log('res...', res.data.lrc.lyric);
      yield put({
        type: 'getLyricData',
        payload: res.data.lrc.lyric
      });
    }
  },
  reducers: {
    getMusicDetailData(state, action){
      let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll'));
      let current = 0;
      if(songsDetailAll){
        songsDetailAll.map((v,i) => {
          if(action.payload.id === v.id){
            current = i;
          }
        })
      }
      // console.log('action...', action);
      return {...state, musicDetailData:{...action.payload},current}
    },
    getSongs(state, action){
      // console.log('action...', action);
      return {...state, songUrl:action.payload}
    },
    getSwitchPlay(state, action){
      let newState = {...state};
      let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll')) || newState.songsDetailAll;
      let songsUrlAll = JSON.parse(storage.getItem('songsAll')) || newState.songsUrlAll;
      if(action.payload === 'next'){
        newState.current++;
        if(newState.current > songsDetailAll.length-1){
          return state;
        }
      }else{
        newState.current--;
        if(newState.current < 0){
          return state;
        }
      }
      newState.musicDetailData = songsDetailAll[newState.current];
      newState.songUrl = songsUrlAll.filter(item => item.id === newState.musicDetailData.id)[0].url;
      return newState;
    },
    getSongsDetailAll(state, action){
      // console.log('action...', action);
      return {...state, songsDetailAll:action.payload}
    },
    getSongsAll(state, action){
      // console.log('action...', action);
      return {...state, songsUrlAll:action.payload}
    },
    musicListChange(state, action){
      let newState = {...state};
      let songsDetailAll = JSON.parse(storage.getItem('songsDetailAll')) || newState.songsDetailAll;
      let songsUrlAll = JSON.parse(storage.getItem('songsAll')) || newState.songsUrlAll;
      newState.musicDetailData = songsDetailAll.filter(item => item.id === action.payload)[0];
      newState.songUrl = songsUrlAll.filter(item => item.id === action.payload)[0].url;
      songsDetailAll.map((v,i) => {
        if(newState.musicDetailData.id === v.id){
          newState.current = i;
        }
      })
      // console.log('newState.current...',newState.current);
      return newState;
    },
    getLyricData(state,action){
      return {...state, lyric:action.payload}
    }
  }
};
