import dva from 'dva';
import './components/flexible';
import 'antd-mobile/dist/antd-mobile.css';
import './index.scss';

let FastClick = require('fastclick');
FastClick.attach(document.body);

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/index').default);
app.model(require('./models/discover/recommend').default);
app.model(require('./models/play').default);
// app.model(require('./models/picList').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
