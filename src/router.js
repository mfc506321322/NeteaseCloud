import React from 'react';
import { Router} from 'dva/router';

import config from './router/index';
import RouterView from './router/RouterView';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <React.Fragment>
        <RouterView routes={config.routes}></RouterView>
      </React.Fragment>
    </Router>
  );
}

export default RouterConfig;
