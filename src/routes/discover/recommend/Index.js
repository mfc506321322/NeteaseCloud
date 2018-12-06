import React, { Component } from "react";
import styles from "./Index.scss";
import { connect } from "dva";
import { NavLink } from "dva/router";
import { Carousel, WingBlank } from "antd-mobile";
import PicList from "../../../components/PicList/Index";
class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRecommendBannerData();
    this.props.getVipData();
    this.props.getPicListRadioData(6);
    this.props.getPicListPlayListData(6);
    this.props.getPicListMusicData(6);
  }
  render() {
    let { bannerData, radio, playList, music,vipData } = this.props;
    return (
      <div className={styles.recommend}>
        <header className={styles.header}>
          <WingBlank>
            <Carousel autoplay={true} infinite>
              {bannerData.length > 0 &&
                bannerData.map((val, i) => (
                  <a
                    key={i}
                    href="http://www.alipay.com"
                    style={{
                      display: "inline-block",
                      width: "100%"
                    }}
                  >
                    <img
                      src={val.imageUrl}
                      alt=""
                      style={{ width: "100%", verticalAlign: "top" }}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event("resize"));
                        this.setState({ imgHeight: "auto" });
                      }}
                    />
                  </a>
                ))}
            </Carousel>
          </WingBlank>
        </header>
        <div className={styles.menu}>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="/img/icon/fm.png" alt="" />
            </div>
            <span>私人FM</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="/img/icon/calendar.png" alt="" />
            </div>
            <span>每日推荐</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="/img/icon/playlist.png" alt="" />
            </div>
            <span>歌单</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="/img/icon/list.png" alt="" />
            </div>
            <span>排行榜</span>
          </NavLink>
        </div>
        <PicList title="推荐歌单" datas={playList} />
        <PicList title="最新音乐" datas={music} />
        <PicList title="主播电台" datas={radio} />
        <div className={styles.vip}>
          <h4>会员专区</h4>         
          <WingBlank>
            <Carousel
              className="space-carousel"
              frameOverflow="visible"
              cellSpacing={10}
              slideWidth={0.8}
              autoplay
              infinite
              dots={false}
            >
              {vipData.length > 0 && vipData.map((val, index) => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{
                    display: "block",
                    position: "relative",
                    top: '50%',
                    height: 'auto',
                    background:'#fff',
                    borderRadius: '4px',
                    paddingBottom:'1px'
                  }}
                >
                  <img
                    src={val.picUrl}
                    alt=""
                    style={{ width: "100%", verticalAlign: "top" }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"));
                      this.setState({ imgHeight: "auto" });
                    }}
                  />
                  <span>
                    {val.name}
                  </span>
                </a>
              ))}
            </Carousel>
          </WingBlank>
          <div className={styles.vipBtn}>
            <button>进入会员中心</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { bannerData, radio, playList, music,vipData } = state.recommend;
  return {
    bannerData,
    radio,
    playList,
    music,
    vipData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecommendBannerData: () => {
      dispatch({
        type: "recommend/getRecommendBannerData"
      });
    },
    getPicListRadioData: (slice) => {
      dispatch({
        type: "recommend/getPicListRadioData",
        slice
      });
    },
    getPicListPlayListData: (slice) => {
      dispatch({
        type: "recommend/getPicListPlayListData",
        slice
      });
    },
    getPicListMusicData: (slice) => {
      dispatch({
        type: "recommend/getPicListMusicData",
        slice
      });
    },
    getVipData:() => {
      dispatch({
        type: "recommend/getVipData"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
