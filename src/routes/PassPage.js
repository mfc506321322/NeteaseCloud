import { connect } from 'dva';
import styles from './PassPage.scss';
import React, { Component } from 'react';
@connect(
  state => {
    return {}
  },
  dispatch => {
    return {
      loginIn:(user,pwd) => {
        dispatch({
          type:'index/login',
          user,
          pwd
        })
      }
    }
  }
)
class PassPage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      pwd:'',
      user:''
    }
  }
  
  login = () => {
    let {
      user,
      pwd
    } = this.state;
    console.log(user,pwd);
    this.props.loginIn(user,pwd);
  }
  render(){
    let {
      user,
      pwd
    } = this.props;
    return (
      <div className={styles.wrap}>
        <header className={styles.header}>
          <a href="javascript:history.back();">
            <img src="/img/icon/back.png" alt=""/>
          </a>
          <h4>手机号登录</h4>
          <div className={styles.basis}></div>
        </header>
        <div className={styles.main}>
          <label>
            <img src="/img/icon/tel.png" alt=""/>
            <input type="text" value={user} maxLength={11} placeholder='手机号' onChange={(e) => {
              this.setState({
                user:e.target.value
              })
            }}/>
          </label>
          <label>
            <img src="/img/icon/pwd.png" alt=""/>
            <input type="password" value={pwd} placeholder='密码' onChange={(e) => {
              this.setState({
                pwd:e.target.value
              })
            }}/>
          </label>
          <button onClick={
            this.login
          }>登录</button>
        </div>
      </div>
    )
  };
}

export default PassPage;