import React from 'react';
import * as css from './_speaker.scss';
import * as FontAwesome from 'font-awesome-webpack';
import { connect } from 'react-redux';
import {initAudio, playAudio, stopAudio} from '../../../actions/AudioPlayerAction';
import {stopRecognition} from '../../../actions/RecognitionAction';
import audioPlayer from '../../../class/AudioPlayer'


class Speaker extends React.Component {
    constructor(props) {
        super(props);
        this.onPlayAudio = this.onPlayAudio.bind(this);
        this.audioOnEnd = this.audioOnEnd.bind(this);
    }
    componentDidMount() {
    }
    onPlayAudio(e) {
        let {playing, recognizing, dispatch, recognitionResult} = this.props;

        if (!playing) {
            if(recognizing) {
                dispatch(stopRecognition());
            }
            setTimeout( () => {
                dispatch(playAudio(true, recognitionResult));
                audioPlayer.playAudio(this.props.url, this.props.text);
                if(audioPlayer.typeAudio) {
                    audioPlayer.audioPlayer.onended = this.audioOnEnd;
                } else {
                    audioPlayer.speechSynthesisUtterance.onend = this.audioOnEnd;
                }
            }, 100)

        } else {
            audioPlayer.stopAudio();
            dispatch(stopAudio(recognitionResult));
        }
    }

    audioOnEnd() {
        let {playing, dispatch, recognitionResult} = this.props;
        dispatch(stopAudio(recognitionResult));
    }

    render() {
        let {playing} = this.props;

        return (
            <div className="ui-speaker" onClick={this.onPlayAudio}>
                <i className={!playing ? "fa fa-volume-up" : "fa fa-pause  fa-1"}
                   aria-hidden="true"></i>
            </div>
        );
    }
};

const SelectPlaying = (state) => {
    let {playing,recognitionResult} = state.audio;
    let {recognizing, result} = state.recognition;
     recognitionResult = result ? result : recognitionResult;
    if(!playing) {
        setTimeout(() => {
            audioPlayer.stopAudio();
        }, 0)

    }

    return {
        playing: playing,
        recognitionResult:recognitionResult,
        recognizing: recognizing
    }
};

export default connect(SelectPlaying)(Speaker);