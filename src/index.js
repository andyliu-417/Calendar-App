import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App/App';
import registerServiceWorker from './helpers/registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
