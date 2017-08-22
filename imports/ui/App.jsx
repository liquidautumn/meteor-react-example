import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import NavigationMenu from './NavigationMenu.jsx'
import Nothing from './Nothing.jsx'

export const App = ( props ) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="app-wrapper">
      <AppBar
        title="Illusion of Presence"
        iconElementRight={<NavigationMenu />}
        iconElementLeft={<Nothing />}
        style={{backgroundColor: '#bf360c'}}
      />
      <main className="app-main">
        <div className="app-content">
          {props.children}
        </div>
      </main>
    </div>
  </MuiThemeProvider>
);
