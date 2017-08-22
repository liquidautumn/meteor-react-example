// modules/App.js
import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';

export default React.createClass({
  render() {
    return (
      <nav>
        <FlatButton
          containerElement={<Link to="/" />}
          linkButton={true}
          label="Home"/>
        <FlatButton
          containerElement={<Link to="/observe" />}
          linkButton={true}
          label="Observe"/>
        <FlatButton
          containerElement={<Link to="/contribute" />}
          linkButton={true}
          label="Contribute"/>
      </nav>
  )
  }
})
