import { routerRedux } from 'dva/router';
import {getToken, setToken} from '../utils/user';
import {
  login,
  searchVal,
  getUserInfo
} from '../services/index';
export default {
  namespace: "index",
  state: { routePath: "/main/discover",searchData:[],userInfo:{}},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log('pathname...', pathname);
        if (pathname !== '/login') {
          if(pathname !== '/passPage'){
            if (!getToken()){
              dispatch(routerRedux.replace({
                pathname: '/login',
              }))
            }
          }
        }
      });
    },
  },
  effects: {
    *login(action, {call, put}){
      console.log('login action...', action);
      let response = yield call(login,action.user,action.pwd);
      // console.log('response...', response);
      setToken(response.data.account.id);
      yield put({
        type: 'updateState',
        payload: response.data
      });
      yield put(routerRedux.replace({
        pathname: '/',
      }))
    },
    *searchVal(action, {call, put}){
      console.log('login action...', action);
      let response = yield call(searchVal,action.val);
      // console.log('response...', response.data.result.songs);
      yield put({
        type: 'getSearchVal',
        payload: response.data.result.songs
      });
    },
    *getUserInfo(action, {call, put}){
      // console.log('user action...', getToken());
      let response = yield call(getUserInfo,getToken());
      console.log('response.user...', response.data);
      yield put({
        type: 'getUserInfoData',
        payload: response.data
      });
    }
  },
  reducers: {
    getRoutePath(state, { routePath}) {
      console.log( routePath );
      return {
        ...state,
        routePath
      };
    },
    updateState(state, action){
      // console.log('action...', action);
      return {...state, ...action.payload}
    },
    getSearchVal(state, action){
      // console.log('action...', action);
      return {...state, searchData:[...action.payload]}
    },
    getUserInfoData(state, action){
      // console.log('action...', action);
      return {...state, userInfo:{...action.payload}}
    }
  }
};
