import React, { Component } from 'react';
import RouterView from '../router/RouterView';
import {NavLink} from 'dva/router';
import styles from './MainPage.scss';
import { connect } from "dva";
class MainPage extends Component {
    render() {
        let path = this.props.routePath;
        return (
            <React.Fragment>
                <div className={styles.main}>
                    <RouterView routes={this.props.routes}></RouterView>
                </div>
                <footer>
                    <NavLink to="/main/discover">
                        <img src={path === "/main/discover" ? '/img/icon/find.png' : '/img/icon/find-n.png'} alt=""/>
                        <span>发现</span>
                    </NavLink>
                    <NavLink to="/main/video">
                        <img src={path === "/main/video" ? '/img/icon/video.png' : '/img/icon/video-n.png'} alt=""/>
                        <span>视频</span>
                    </NavLink>
                    <NavLink to="/main/my">
                        <img src={path === "/main/my" ? '/img/icon/my.png' : '/img/icon/my-n.png'} alt=""/>
                        <span>我的</span>
                    </NavLink>
                    <NavLink to="/main/friend">
                        <img src={path === "/main/friend" ? '/img/icon/friend.png' : '/img/icon/friend-n.png'} alt=""/>
                        <span>朋友</span>
                    </NavLink>
                    <NavLink to="/main/account">
                        <img src={path === "/main/account" ? '/img/icon/user.png' : '/img/icon/user-n.png'} alt=""/>
                        <span>账号</span>
                    </NavLink>
                </footer>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
let {routePath} = state.index;
    return {
        routePath
    };
};

export default connect(
    mapStateToProps
)(MainPage);