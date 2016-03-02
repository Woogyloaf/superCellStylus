"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMessage from './components/Message';

ReactDOM.render(
    <ReactMessage phrase="React Component!"/>,
    document.querySelector('#app')
);


// https://github.com/ModuleLoader/es6-module-loader/wiki/Brief-Overview-of-ES6-Module-syntax
console.log('javascript reporting in from app.js ...');