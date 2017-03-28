import React from 'react';
import * as css from './_recorder.scss';
import * as FontAwesome from 'font-awesome-webpack';
import {connect} from 'react-redux';
import {stopAudio} from '../../../actions/AudioPlayerAction';
import {startRecognition, stopRecognition, voiceSpeechRecognitionResult} from '../../../actions/RecognitionAction';
import webRecognition from '../../../class/WebRecognition';

class Recorder extends React.Component {
    constructor(props) {
        super(props);
        this.onStartRecognition = this.onStartRecognition.bind(this);
        this.onResultOfSpeechRecognition = this.onResultOfSpeechRecognition.bind(this);
        this.onErrorOfSpeechRecognition = this.onErrorOfSpeechRecognition.bind(this);
        this.onEndOfSpeechRecognition = this.onEndOfSpeechRecognition.bind(this);
    }

    onStartRecognition(event) {
        let {recognizing, dispatch} = this.props;

        if (recognizing) {
            dispatch(stopRecognition());
            return;
        }

        dispatch(stopAudio());
        dispatch(startRecognition());
        setTimeout( () => {
            webRecognition.startRecognition(event.timestamp);
            webRecognition.recorder.onresult = this.onResultOfSpeechRecognition;
            webRecognition.recorder.onerror = this.onErrorOfSpeechRecognition;
            webRecognition.recorder.onend = this.onEndOfSpeechRecognition;
        }, 0);
    }

    onResultOfSpeechRecognition(event) {
        let {recognizing, dispatch} = this.props;
        let result = webRecognition.onResultOfSpeechRecognition(event);
        dispatch(voiceSpeechRecognitionResult(result));
    }

    onErrorOfSpeechRecognition(event) {
        let {dispatch} = this.props;
        webRecognition.onErrorOfSpeechRecognition(event);
        dispatch(stopRecognition());
    }

    onEndOfSpeechRecognition(event) {
        let {dispatch} = this.props;
        webRecognition.onEndOfSpeechRecognition(event);
        dispatch(stopRecognition());
    }

    render() {
        let {recognizing} = this.props;
        return (
            <div className="ui-d-recognition-recorder">
                <div className="recorder-container" onClick={this.onStartRecognition}>
                    <div className={recognizing ? "outer" : "hidden"}></div>
                    <div className={recognizing ? "outer" : "hidden"}></div>
                    <div className="icon-microphone">
                        <i className="fa fa-microphone" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const isRecognizing = (state) => {
    let recognizing = state.recognition.recognizing;
    if (!recognizing) {
        webRecognition.stop();
    }
    return {
        recognizing: state.recognition.recognizing
    }
};

export default connect(isRecognizing)(Recorder);