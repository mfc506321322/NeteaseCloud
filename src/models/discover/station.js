import {
  getVipStationData,
  getOptimization
} from '../../services/index';
export default {
  namespace: "station",
  state: {
    vipData:[],
    optimizationData:[]
  },
  effects: {
    *getVipStationData(action, { call, put }) {
      let res = yield call(getVipStationData);
      console.log('VipData...', res.data.data.list);
      yield put({
        type: "getVipStationDatas",
        vipData: res.data.data.list
      });
    },
    *getOptimization(action, { call, put }) {
      let res = yield call(getOptimization);
      console.log('optimizationData...', res.data.djRadios);
      yield put({
        type: "getOptimizationData",
        optimizationData: res.data.djRadios
      });
    }
  },
  reducers: {
    getVipStationDatas(state, { vipData }) {
      return {
        ...state,
        vipData: [...vipData]
      };
    },
    getOptimizationData(state, { optimizationData }) {
      return {
        ...state,
        optimizationData: [...optimizationData]
      };
    }
  }
};
  