import React from "react";
import { connect } from "dva";
import styles from './Index.scss';
class Index extends React.Component {
  componentDidMount() {
    console.log(this.props.match.path);
    this.props.getRoutePath(this.props.match.path);
    this.props.getUserInfo();
  }
  render() {
    let {userInfo} = this.props;
    let v = userInfo.profile;
    return <React.Fragment>
      {Object.keys(userInfo).length > 0 && <div className={styles.account}>
        <header className={styles.header}>
          <div className={styles.basis}></div>
          <h1>
            账号
          </h1>
          <img src="./icon/audio-n.png" alt=""/>
        </header>
        <div className={styles.main}>
          <div className={styles.top}>
            <img src={v.avatarUrl} alt=""/>
            <div className={styles.tText}>
              <h2>{v.nickname}</h2>
              <em>lv.{userInfo.level}</em>
            </div>
            <div className={styles.sign}>
              <h5>签到</h5>
            </div>
          </div>
          <div className={styles.middle}>
            <ol className={styles.middleBox}>
              <li>
                <h6>动态</h6>
                <span>{v.eventCount}</span>
              </li>
              <li>
                <h6>关注</h6>
                <span>{v.playlistBeSubscribedCount}</span>
              </li>
              <li>
                <h6>粉丝</h6>
                <span>{v.follows}</span>
              </li>
              <li>
                <img src="./icon/user.png" alt=""/>
                <h6>我的资料</h6>
              </li>
            </ol>
          </div>
          <div className={styles.content}>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/message.png" alt=""/>
                <span>我的消息</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/vipcenter.png" alt=""/>
                <span>会员中心</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/shopcar.png" alt=""/>
                <span>商城</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/game.png" alt=""/>
                <span>游戏推荐</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/yinle.png" alt=""/>
                <span>在线听歌免流量</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
            <div className={styles.cli}>
              <div className={styles.left}>
                <img src="./icon/set.png" alt=""/>
                <span>设置</span>
              </div>
              <img src="./icon/goto.png" alt=""/>
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  }
}
const mapStateToProps = state => {
  let { routePath ,userInfo} = state.index;
  return {
    routePath,
    userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoutePath: routePath => {
      dispatch({
        type: "index/getRoutePath",
        routePath
      });
    },
    getUserInfo: () => {
      dispatch({
        type: "index/getUserInfo"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
