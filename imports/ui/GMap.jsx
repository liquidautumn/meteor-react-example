import { default as React, Component } from "react";
import ReactDOM from 'react-dom';

import {
  default as canUseDOM,
} from "can-use-dom";

import {GoogleMapLoader, GoogleMap, Marker, SearchBox } from "@liquidautumn/react-google-maps";

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure(`Your browser doesn't support geolocation.`);
    },
  }
);

const inputStyle = {
  "border": `1px solid transparent`,
  "borderRadius": `1px`,
  "boxShadow": `0 2px 6px rgba(0, 0, 0, 0.3)`,
  "boxSizing": `border-box`,
  "MozBoxSizing": `border-box`,
  "fontSize": `14px`,
  "height": `32px`,
  "marginTop": `27px`,
  "outline": `none`,
  "padding": `0 12px`,
  "textOverflow": `ellipses`,
  "width": `90%`,
}

export default class GMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      center: null,
      locationTitle: null
    };
  }

  reverseGeocode(coords) {
    var geocoder = new google.maps.Geocoder;
    var location = {lat: coords.latitude, lng: coords.longitude}
    geocoder.geocode({'location': location}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          this.setState({locationTitle: results[1].formatted_address});
        } else {
          this.setState({locationTitle: 'Unknown location'});
        }
        let sbox = document.getElementsByClassName('searchBoxClass')[0];
        sbox.value = this.state.locationTitle;
        //sbox.focus();
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    }.bind(this));
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      this.reverseGeocode(position.coords);

      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });

    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${ reason }).`,
      });
    });
  }

  handlePlacesChanged(e){
    const places = this.refs.searchBox.getPlaces();
    if(places.length > 0){
      this.setState({
        center: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() },
        locationTitle: places[0].formatted_address
      });
    }
  }

  render() {
    const { center, locationTitle } = this.state;

    const mapOptions = {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }

    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "323px",
                width: "642px"
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={7}
              center={center}
              defaultOptions={mapOptions}>
              <SearchBox
                controlPosition={google.maps.ControlPosition.TOP_CENTER}
                onPlacesChanged={this.handlePlacesChanged.bind(this)}
                ref="searchBox"
                classes="searchBoxClass"
                placeholder=""
                style={inputStyle}
              />
            <Marker key="marker" position={center} />
            </GoogleMap>
          }
        />
      </section>
    );
  }
}
