import request from '../utils/request';

const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'';
// 获取banner
export function getRecommendBannerData(){
  return request(`${host}/banner`)
}

// 获取vip专享
export function getVipData(){
  return request(`${host}/personalized/privatecontent`)
}

// 获取推荐歌单
export function getPicListPlayListData(){
  return request(`${host}/personalized/djprogram`)
}

// 获取推荐电台
export function getPicListRadioData(){
  return request(`${host}/personalized`)
}

// 获取最新音乐
export function getPicListMusicData(){
  return request(`${host}/personalized/newsong`)
}