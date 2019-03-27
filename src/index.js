import React from "react";
import ReactDOM from "react-dom";

import './js/rainbows.js';
import './js/unicorns.js';
import './scss/base.scss';

import  { default as Game }  from "./components/Snake/Game"

ReactDOM.render(<Game/>, document.getElementById("root"));