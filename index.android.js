import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  NativeModules,
  TouchableHighlight
} from 'react-native';

var MyAudioPlayer  = NativeModules.MyAudioPlayer;

var buttonStyles = { marginTop: 8, backgroundColor: '#dddddd', padding: 10 };
var statStyle = { flex: 0.5, backgroundColor: '#cccccc', padding: 8, borderColor: '#ffffff', borderWidth: 1, margin: 2 };

class ReactNativeModuleTutorial extends Component {
  constructor(props){
    super(props);
    this.state = {
      mp3Url: 'http://files-01.mobilesringtones.com/files/2016/05/27/12963/12963.mp3',
      prepared: false,
      playing: false,
      duration: 0
    };
  }
  componentDidMount(){
    MyAudioPlayer.preparePlayer(this.state.mp3Url);
    MyAudioPlayer.setOnPreparedCallback((duration) => {
      this.setState({ prepared: true, duration: duration });
    });
  }
  playSound(){
    if (this.state.prepared === true) {
      this.setState({ playing: true });
      MyAudioPlayer.play();
      return true;
    }
    return false;
  }
  pauseSound(){
    if (this.state.prepared === true && this.state.playing === true) {
      MyAudioPlayer.pause();
      this.setState({ playing: false })
      return true;
    }
    return false;
  }
  render() {
    return (
      <View style={{ flex:1, alignItems: 'stretch', backgroundColor: '#F5FCFF' }}>
        <View style={{ padding: 10, backgroundColor: '#939cb0' }}>
          <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 24 }}>Audio Player</Text>
        </View>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 8 }}>
          <View style={statStyle}><Text style={{ textAlign: 'center' }}>Prepared : {(this.state.prepared) ? 'Yes' : 'No'}</Text></View>
          <View style={statStyle}><Text style={{ textAlign: 'center' }}>Playing : {(this.state.playing) ? 'Yes' : 'No'}</Text></View>
        </View>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 8 }}>
          <View style={statStyle}><Text style={{ textAlign: 'center' }}>Duration : {this.state.duration}</Text></View>
        </View>
        <View style={{ padding: 5 }}>
          <TouchableHighlight
            style={buttonStyles}
            onPress={this.playSound.bind(this)}>
            <Text style={{ textAlign: 'center' }}>Play</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={buttonStyles}
            onPress={this.pauseSound.bind(this)}>
            <Text style={{ textAlign: 'center' }}>Pause</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeModuleTutorial', () => ReactNativeModuleTutorial);
