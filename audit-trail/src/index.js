import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuditTrail from './components/AuditTrail';
import './scss/audit.scss';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <AuditTrail />,
  document.getElementById('root')
);

serviceWorker.unregister();
