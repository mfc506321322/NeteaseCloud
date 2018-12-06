import React, { Component } from 'react';
import {NavLink} from 'dva/router';
import styles from './Index.scss';
const Index = (props) => {
  let {datas,title} = props;
  return (
    <div className={styles.list}>
      <div className={styles.title}>{title} ></div>
      <ul>
        {
          title !== '最新音乐' && datas.length > 0 && datas.map((v,i) => {
            return <li key={i}>
              <img src={v.picUrl} alt=""/>
              <span>{v.name}</span>
            </li>
          })
        }
        {
          title === '最新音乐' && datas.length > 0 && datas.map((v,i) => {
            return <li key={i}>
              <img src={v.song.album.picUrl} alt=""/>
              <span>{v.song.album.name}</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}
export default Index;

