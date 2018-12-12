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
                        <img src={path === "/main/discover" ? './icon/find.png' : './icon/find-n.png'} alt=""/>
                        <span>发现</span>
                    </NavLink>
                    <NavLink to="/main/video">
                        <img src={path === "/main/video" ? './icon/video.png' : './icon/video-n.png'} alt=""/>
                        <span>视频</span>
                    </NavLink>
                    <NavLink to="/main/my">
                        <img src={path === "/main/my" ? './icon/my.png' : './icon/my-n.png'} alt=""/>
                        <span>我的</span>
                    </NavLink>
                    <NavLink to="/main/friend">
                        <img src={path === "/main/friend" ? './icon/friend.png' : './icon/friend-n.png'} alt=""/>
                        <span>朋友</span>
                    </NavLink>
                    <NavLink to="/main/account">
                        <img src={path === "/main/account" ? './icon/user.png' : './icon/user-n.png'} alt=""/>
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