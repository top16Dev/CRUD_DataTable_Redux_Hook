import React from 'react';
import { Provider } from 'react-redux'

// import logo from './logo.svg';
import './App.css';

import configureStore from './store'

import Routes from './routes'

function App() {
  return (
    <Provider store={configureStore}>
      <Routes />
    </Provider>
  );
}

export default App;
