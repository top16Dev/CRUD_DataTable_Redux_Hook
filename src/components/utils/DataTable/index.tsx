import React, {Fragment} from "react";
import Informasi from './Informasi';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import store from '../../../store'
import { Provider } from 'react-redux'

export default function App() {

  return (
    <Fragment>
      <Provider store={store}>
        <Informasi />
      </Provider>
    </Fragment>
  );
}