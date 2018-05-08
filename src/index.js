import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App/App';
import registerServiceWorker from './helpers/registerServiceWorker';
import enUS from 'antd/lib/locale-provider/en_US';
import {LocaleProvider} from 'antd';

ReactDOM.render((
  <LocaleProvider locale={enUS}>
    <App/>
  </LocaleProvider>
), document.getElementById('root'));
registerServiceWorker();
