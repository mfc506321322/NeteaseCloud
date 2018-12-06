import React from "react";
import { connect } from "dva";
class Index extends React.PureComponent {
  componentWillMount() {
    console.log(this.props.match.path);
    this.props.getRoutePath(this.props.match.path);
  }
  render() {
    console.log("props..", this.props);
    return <h1>{this.props.match.path}</h1>;
  }
}
const mapStateToProps = state => {
  let { routePath } = state.index;
  return {
    routePath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoutePath: routePath => {
      dispatch({
        type: "index/getRoutePath",
        routePath
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
