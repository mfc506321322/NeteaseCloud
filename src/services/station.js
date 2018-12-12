import request from '../utils/request';

const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';

// 获取精品电台
export function getVipStationData(){
  return request(`${host}/dj/paygift?limit=10&offset=20`)
}

//获取今日优选
export function getOptimization(){
  return request(`${host}/dj/recommend`)
}