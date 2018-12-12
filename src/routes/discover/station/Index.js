import React, { Component } from "react";
import styles from "./Index.scss";
import { connect } from "dva";
import { NavLink } from "dva/router";
import { Carousel, WingBlank } from "antd-mobile";
import StationList from '../../../components/StationList/Index';
class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRecommendBannerData();
    this.props.getVipStationData();
    this.props.getOptimization();
  }
  render() {
    let { bannerData,vipData,optimizationData } = this.props;
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
                      width: "100%",
                      borderRadius: '4px',
                      overflow:'hidden'
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
              <img src="./icon/class.png" alt="" />
            </div>
            <span>电台分类</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="./icon/rank.png" alt="" />
            </div>
            <span>电台排行</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="./icon/sfm.png" alt="" />
            </div>
            <span>DI电音</span>
          </NavLink>
          <NavLink to="">
            <div className={styles.imgbox}>
              <img src="./icon/ice.png" alt="" />
            </div>
            <span>小冰电台</span>
          </NavLink>
        </div>

        <StationList title="今日优选" datas={optimizationData} />

        <div className={styles.vip}>
          <h4>精品推荐</h4>
          <div className={styles.spaceCarousel}>
            <div className={styles.vipbox}>
            {vipData.length > 0 && vipData.map((val, index) => (
                <div className={styles.vipli} key={index}>
                  <img
                    src={val.picUrl}
                    alt=""
                  />
                  <div className={styles.text}>
                    <span>
                      {val.name}
                    </span>
                    <em>
                      ￥{val.originalPrice}
                    </em>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.vipBtn}>
            <button>全部精品电台</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { bannerData } = state.recommend;
  let { vipData,optimizationData } = state.station;
  return {
    bannerData,
    vipData,
    optimizationData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecommendBannerData: () => {
      dispatch({
        type: "recommend/getRecommendBannerData"
      });
    },
    getVipStationData:() => {
      dispatch({
        type: "station/getVipStationData"
      });
    },
    getOptimization:() => {
      dispatch({
        type: "station/getOptimization"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
