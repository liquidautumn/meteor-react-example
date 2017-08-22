import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Routes } from '../imports/Routes.jsx';

import App from '../imports/ui/App.jsx';

Meteor.startup(function () {
  ReactDOM.render(<Routes />, document.getElementById("App"));
});
