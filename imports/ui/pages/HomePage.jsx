import React from 'react';

import Paper from 'material-ui/Paper';

import { Link } from 'react-router'

const containerStyle = {
  margin: 15,
  padding: 20
};

const boxStyle = {
  fontSize: '1.75em',
  maxWidth: 642,
  margin: '0 auto'
};

export const HomePage = () => (
  <Paper style={containerStyle}>
    <div style={boxStyle}>
      <p>We want to see and hear what you've seen and heard, or what you want us to see and hear.</p>
      <p>Ready to share? All simple: click <Link to="/contribute">Contibute</Link> on top.</p>
      <p>Feeling a bit shy? Go see what others have shared by clicking <Link to="/observe">Observe</Link>.</p>
      <p>Thanks for being with us!</p>
    </div>
  </Paper>
);
