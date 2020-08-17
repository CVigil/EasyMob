import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DashboardPage2 from "./pages/DashboardPage2";
import Mapa from "./pages/Mapa";
import Mapa2 from "./pages/Mapa2";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Route key="index" exact path="/" component={DashboardPage} />
        <Route key="stats" exact path="/estadisticas" component={DashboardPage2} />
        <Route key="map" exact path="/mapa" component={Mapa2} />
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
); // If you want your app to work offline and load faster, you can change
//  unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
