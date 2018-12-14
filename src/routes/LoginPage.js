import styles from './LoginPage.scss';
import React from 'react';
import {NavLink} from 'dva/router';
const IndexPage = (props) => {
  return (
    <div className={styles.wrap}>
      <img src='./icon/logo.png' alt=""/>
      <div className={styles.btn}>
        <NavLink to='/passPage' onClick={() => {
            window._hmt.push(['_trackEvent', '网易云音乐登录页', '点击事件', '进入账号页']);
          }}>手机号登录</NavLink>
        <NavLink to='/passPage'>注册</NavLink>
      </div>
    </div>
  )
}

export default IndexPage;
