webpackJsonp([3],{YyMM:function(t,n){t.exports={point:"point___3SBr6"}},ss9M:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("YbOa"),u=e.n(o),r=e("U5hO"),i=e.n(r),a=e("EE81"),p=e.n(a),s=e("Jmyu"),c=e.n(s),h=e("/00i"),l=e.n(h),f=e("9wvh"),m=e.n(f),y=e("NmwX"),P=(e.n(y),e("YyMM")),M=e.n(P),d=function(t){function n(){return u()(this,n),c()(this,l()(n).apply(this,arguments))}return p()(n,[{key:"componentWillMount",value:function(){console.log(this.props.match.path),this.props.getRoutePath(this.props.match.path)}},{key:"render",value:function(){return console.log("props..",this.props),m.a.createElement("h1",{className:M.a.point},"\u5f53\u524d\u9875\u9762\u6b63\u5728\u5b8c\u5584\u4e2d...")}}]),i()(n,t),n}(m.a.PureComponent),g=function(t){return{routePath:t.index.routePath}},v=function(t){return{getRoutePath:function(n){t({type:"index/getRoutePath",routePath:n})}}};n.default=Object(y.connect)(g,v)(d)}});