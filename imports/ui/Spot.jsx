import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import IconButton from 'material-ui/IconButton';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';

import Card from 'material-ui/Card/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import CircularProgress from 'material-ui/CircularProgress';

import SoundPlayerContainer from '../player/SoundPlayerContainer.jsx';

const clientId = '442150566a77abf86144cc2bc79af128';

class CustomPlayer extends React.Component {

  play(e) {
    e.preventDefault();
    e.stopPropagation();
    let { soundCloudAudio, playing } = this.props;
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  render() {
    let { track, playing } = this.props;

    if (!track) {
      return <CircularProgress size={0.2} />;
    }

    return (
      <div>
        <IconButton
          children={ playing ? <PauseIcon/> : <PlayIcon/> }
          tooltip={track.title}
          tooltipPosition="top-right"
          onTouchTap={this.play.bind(this)}
        />
      </div>
    );
  }
}

export default class Spot extends Component {
  render() {
    var player;
    if(this.props.spot.soundUrl) {
      player = (
        <SoundPlayerContainer resolveUrl={this.props.spot.soundUrl} clientId={clientId}>
          <CustomPlayer />
        </SoundPlayerContainer>
      );
    }
    return (
      <div className={"col-xs-12 col-md-6 col-lg-4"}>
          <Card style={{marginBottom: 15}} onTouchTap={this.props.onLocationClick}>
            <CardMedia>
              <div style={{height: 300, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(http://' + window.location.hostname + ':4242' + this.props.spot.imagePath + ')'  }}>
              </div>
            </CardMedia>
            <CardTitle style={{padding: '10px 15px 0 20px'}} titleStyle={{fontSize: '15px'}} title={this.props.spot.locationTitle} />
            <CardActions style={{minHeight: 48, padding: 0}}>
              {player}
            </CardActions>
          </Card>
      </div>
    );
  }
}

Spot.propTypes = {
  spot: PropTypes.object.isRequired
};
