import React, { Component } from "react";
import { NavLink } from "dva/router";
import styles from "./Index.scss";
const Index = props => {
  let { datas, title } = props;
  return (
    <div className={styles.list}>
      <div className={styles.title}>{title} ></div>
      <ul>
        {datas.length > 0 &&
          datas.map((v, i) => {
            return (
              <li key={i}>
                <img src={v.picUrl} alt="" />
                <div className={styles.text}>
                  <h4>{v.name}</h4>
                  <span>节目:{v.subCount}</span>
                  <span>{v.rcmdtext}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Index;
