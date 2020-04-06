import React from 'react';
import ReactDOM from 'react-dom';
import Wetpi from './wetpi';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Wetpi />
  </React.StrictMode>,
  document.getElementById('wetpi')
);
serviceWorker.unregister();
