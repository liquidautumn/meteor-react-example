import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactS3Uploader  from 'react-s3-uploader';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import AutoComplete from 'material-ui/AutoComplete';
import Snackbar from 'material-ui/Snackbar';

import GMap from '../GMap.jsx'
import Spot from '../Spot.jsx';

import { Spots } from '../../api/spots.js';

const containerStyle = {
  margin: 15,
  padding: 20
};

const previewStyle = {
  width: 642,
  height: 323,
  marginTop: 15
};

const boxStyle = {
  maxWidth: 642,
  margin: '0 auto'
};

class ContributePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      previewDisplay: 'none',
      progressDisplay: 'none',
      snackbarOpen: false,
      snackbarMessage: 'Something happened',
      imagePath: null,
      submitDisabled: false,
      dataSource: [],
      dataSourceTracks: [],
      soundTitle: null,
      soundUrl: null
    };
  }

  handleSoundRequest(q) {
    var url = null;
    this.state.dataSourceTracks.forEach(function(i){
      if(i.title === q) {
        url = i.permalink_url;
      }
    });
    this.setState({
      soundTitle: q,
      soundUrl: url
    });
  }

  handleSoundUpdate(q) {
    if (q.length < 3){
      this.setState({
        dataSource: [],
      });
      return;
    }
    SC.get('/tracks', {
      q: q,
      limit: 5
    }).then(function(tracks) {
      let titles = tracks.map(function(t){
        return t.title;
      })
      this.setState({
        dataSource: titles,
        dataSourceTracks: tracks,
      });
    }.bind(this));
  }

  dummyFilter(t, k) { return true; }

  handleSnackbarClose() {
    this.setState({snackbarOpen: false })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.imagePath) {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Please, upload image before submit'});
      return;
    }
    if(!this.refs.gmap.state.locationTitle) {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Please, provide location before submit'});
      return;
    }
    let coords = {lng: this.refs.gmap.state.center.lng, lat: this.refs.gmap.state.center.lat};

    Meteor.call('spots.insert', {
      imagePath: this.state.imagePath,
      locationTitle: this.refs.gmap.state.locationTitle,
      locationCoordinates: coords,
      soundTitle: this.state.soundTitle,
      soundUrl: this.state.soundUrl
    });

    this.refs.sound.setState( { searchText: '' })
    this.setState({ snackbarOpen: true, snackbarMessage: 'Submitted, thank you for contribution!'});
    this.setState({
      imagePath: null,
      previewDisplay: 'none',
      submitDisabled: false,
      dataSource: [],
      dataSourceTracks: [],
      soundTitle: null,
      soundUrl: null
    });
  }

  onUploadProgress(completed) {
    if (!this.state.submitDisabled){
      this.setState({progressDisplay: 'inline-block', submitDisabled: true});
    }
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed: completed});
    }
  }

  onUploadError(event) {
    this.setState({ snackbarOpen: true, snackbarMessage: 'Upload failed, please try again'});
    this.setState({progressDisplay: 'none', submitDisabled: false});
  }

  onUploadFinish(event) {
    this.setState({imagePath: event.publicUrl, previewDisplay: 'block', progressDisplay: 'none', submitDisabled: false});
  }

  _openFileDialog(event) {
    var fileUploadDom = document.forms[0].elements[0];
    fileUploadDom.click();
  }

  render() {
    return (
      <Paper style={containerStyle} zDepth={1}>
        <div style={boxStyle}>
          <header>
            <h1>Contribute</h1>
          </header>
          <form className="new-spot" onSubmit={this.handleSubmit.bind(this)} >
            <div style={{display: "none"}}>
              <ReactS3Uploader
                signingUrl="/s3/sign"
                accept="image/*"
                onProgress={this.onUploadProgress.bind(this)}
                onError={this.onUploadError.bind(this)}
                onFinish={this.onUploadFinish.bind(this)}
                server={"http://" + window.location.hostname + ":4242"}
                contentDisposition="auto" />
            </div>
            <div style={{marginBottom: 15}}>
              <label style={{marginBottom: 15, display: 'block'}}>1. Reveal location</label>
              <GMap ref="gmap" />
            </div>
            <div style={{marginBottom: 15}}>
              <label style={{marginBottom: 15, display: 'block'}}>2. Show us what it's like</label>
              <div style={{marginBottom: 15, width: 642, height: 323, display: this.state.previewDisplay, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(http://' + window.location.hostname + ':4242' + this.state.imagePath + ')'  }}>
              </div>
              <RaisedButton label="Upload file" onClick={this._openFileDialog.bind(this)} disabled={this.state.submitDisabled}>
                <LinearProgress ref="progress" mode="determinate" value={this.state.completed} style={{marginBottom: 20, marginTop: 5, display: this.state.progressDisplay}} />
              </RaisedButton>
            </div>
            <div style={{marginBottom: 15}}>
              <label style={{marginBottom: 0, display: 'block'}}>3. Choose sound</label>
              <AutoComplete
                id="soundAutocomplete"
                ref="sound"
                dataSource={this.state.dataSource}
                filter={AutoComplete.noFilter}
                onUpdateInput={_.debounce(this.handleSoundUpdate, 300).bind(this)}
                onNewRequest={this.handleSoundRequest.bind(this)}
                listStyle={{width: 642 }}
              />
            </div>
            <div style={{marginBottom: 160}}>
              <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)} />
            </div>
          </form>
        </div>
        <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={6000}
            onRequestClose={this.handleSnackbarClose.bind(this)}
          />
      </Paper>
    );
  }
}

export default createContainer(() => {
  return {};
}, ContributePage);
