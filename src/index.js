import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App/App';
import registerServiceWorker from './helpers/registerServiceWorker';
import enUS from 'antd/lib/locale-provider/en_US';
import {LocaleProvider} from 'antd';

import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducer';

const store = createStore(reducers, compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f))
  ReactDOM.render((
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <App/>
      </LocaleProvider>
    </Provider>
  
  ), document.getElementById('root'));
  
registerServiceWorker();
