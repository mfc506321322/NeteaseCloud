import request from '../utils/request';
export * from './discover.js';
export * from './station.js';

const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
// 登陆接口
export function login(user,pwd){
  console.log(user,pwd);
  return request(`${host}/login/cellphone?phone=${user}&password=${pwd}`)
}

// 获取用户信息
export function getUserInfo(id){
  return request(`${host}/user/detail?uid=${id}`)
}

//搜索接口
export function searchVal(val){
  console.log(val);
  return request(`${host}/search?keywords=${val}`)
}

//音乐详情
export function getMusicDetail(id){
  console.log(id);
  return request(`${host}/song/detail?ids=${id}`)
}

//音乐mp3
export function getSong(id){
  console.log(id);
  return request(`${host}/song/url?id=${id}`)
}

//全部歌曲信息
export function playDetailAll(arr){
  let ids = arr.join(',');
  return request(`${host}/song/detail?ids=${ids}`)
}

//全部歌曲mp3
export function playSongsAll(arr){
  let ids = arr.join(',');
  return request(`${host}/song/url?id=${ids}`)
}

//获取歌词
export function getLyric(id){
  return request(`${host}/lyric?id=${id}`)
}