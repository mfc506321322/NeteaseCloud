webpackJsonp([7],{WRXb:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("YbOa"),o=n.n(a),r=n("U5hO"),c=n.n(r),i=n("EE81"),s=n.n(i),l=n("Jmyu"),u=n.n(l),m=n("/00i"),h=n.n(m),p=n("9wvh"),d=n.n(p),v=n("NmwX"),_=(n.n(v),n("glPS")),E=n.n(_),f=n("A1Y1"),g=(n.n(f),n("0Rlm")),P=function(e){function t(){return o()(this,t),u()(this,h()(t).apply(this,arguments))}return s()(t,[{key:"componentWillMount",value:function(){console.log(this.props.match.path),this.props.getRoutePath(this.props.match.path)}},{key:"render",value:function(){return d.a.createElement("div",{className:E.a.discover},d.a.createElement("header",{className:E.a.header},d.a.createElement("img",{src:"./icon/listen-n.png",alt:""}),d.a.createElement("label",null,d.a.createElement(f.NavLink,{to:"/main/search"},"\u731c\u4f60\u559c\u6b22 \u6d6e\u751f")),d.a.createElement("img",{src:"./icon/audio-n.png",alt:""})),d.a.createElement("div",{className:E.a.content},d.a.createElement("div",{className:E.a.topTab},d.a.createElement(f.NavLink,{to:"/main/discover/recommend"},"\u4e2a\u6027\u63a8\u8350"),d.a.createElement(f.NavLink,{to:"/main/discover/station"},"\u4e3b\u64ad\u7535\u53f0")),d.a.createElement(g.a,{routes:this.props.routes})))}}]),c()(t,e),t}(d.a.PureComponent),b=function(e){return{routePath:e.index.routePath}},N=function(e){return{getRoutePath:function(t){e({type:"index/getRoutePath",routePath:t})}}};t.default=Object(v.connect)(b,N)(P)},glPS:function(e,t){e.exports={discover:"discover___243yH",header:"header___1jgWW",content:"content___xTNvK",topTab:"topTab___6qDe2"}}});