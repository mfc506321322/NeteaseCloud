import {
  getRecommendBannerData,
  getVipData,
  getPicListPlayListData,
  getPicListRadioData,
  getPicListMusicData
} from '../../services/index';
export default {
  namespace: "recommend",
  state: { 
    bannerData: [],
    radio:[],
    playList:[],
    music:[],
    vipData:[]
  },
  effects: {
    *getRecommendBannerData(action, { call, put }) {
      let res = yield call(getRecommendBannerData);
      // console.log('res.banners...', res.data.banners);
      yield put({
        type: "getData",
        bannerData: res.data.banners
      });
    },
    *getPicListRadioData(action, { call, put }) {
      let res = yield call(getPicListRadioData);
      // console.log("Radio...", res.data.result);
      yield put({
        type: "getRadioData",
        radio:res.data.result.slice(0, action.slice)
      });
    },
    *getPicListPlayListData(action, { call, put }) {
      let res = yield call(getPicListPlayListData);
      // console.log("PlayList...", res.data.result);
      yield put({
        type: "getPlayListData",
        playList:res.data.result.slice(0, action.slice)
      });
    },
    *getPicListMusicData(action, { call, put }) {
      let res = yield call(getPicListMusicData);
      // console.log("music...", res.data.result);
      yield put({
        type: "getMusicData",
        music:res.data.result.slice(0, action.slice)
      });
    },
    *getVipData(action, { call, put }) {
      let res = yield call(getVipData);
      // console.log('VipData...', res.data.result);
      yield put({
        type: "getVipDatas",
        vipData: res.data.result
      });
    },
  },
  reducers: {
    getData(state, { bannerData }) {
      return {
        ...state,
        bannerData: [...bannerData]
      };
    },
    getRadioData(state, { radio }) {
      return {
        ...state,
        radio: [...radio]
      };
    },
    getPlayListData(state, { playList }) {
      return {
        ...state,
        playList: [...playList]
      };
    },
    getMusicData(state, { music }) {
      return {
        ...state,
        music: [...music]
      };
    },
    getVipDatas(state, { vipData }) {
      return {
        ...state,
        vipData: [...vipData]
      };
    }
  }
};
