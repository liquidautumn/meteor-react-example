import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {GoogleMapLoader, GoogleMap, Marker } from "@liquidautumn/react-google-maps";

import Spot from '../Spot.jsx';

import { Spots } from '../../api/spots.js';

class ObservePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapOpen: false,
      mapCenter: null,
      mapTitle: null
    };
  }

  handleOpen() {
    this.setState({mapOpen: true});
  };

  handleClose() {
    this.setState({mapOpen: false});
  };

  onLocationClick(spot) {
    console.log(spot);
    this.setState({mapCenter: spot.locationCoordinates});
    this.setState({mapTitle: spot.locationTitle});
    this.handleOpen();
  }

  renderSpots() {
    return this.props.spots.map((spot) => {
      return (
        <Spot
          key={spot._id}
          onLocationClick={this.onLocationClick.bind(this, spot)}
          spot={spot}
        />
      );
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    const mapOptions = {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }

    const customContentStyle = {
      width: '642px',
      height: '420px'
    };

    return (
      <div className={"container"} style={{marginTop: 15}}>
        <div className={"row"}>
          {this.renderSpots()}
        </div>
        <Dialog
          title={this.state.mapTitle}
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.mapOpen}
        >
          <GoogleMapLoader
            containerElement={
              <div style={{ height: "323px", width: "600px" }} />
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={7}
                center={this.state.mapCenter}
                defaultOptions={mapOptions}>
              <Marker key="marker" position={this.state.mapCenter} />
              </GoogleMap>
            }
          />
        </Dialog>
      </div>
    );
  }
}

ObservePage.propTypes = {
  spots: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('spots');

  return {
    spots: Spots.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, ObservePage);
