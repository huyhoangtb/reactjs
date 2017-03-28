/**
 * Created by Peter Hoang Nguyen on 3/20/2017.
 */
import {connect} from 'react-redux';
import {stopRecognition, startRecognition} from '../actions/RecognitionAction';
import React from 'react';

class WebRecognition {

    startRecognition(startTimestamp) {
        let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        if (this.recorder) {
            this.recorder.stop();
        }

        this.recorder = new SpeechRecognition();
        this.recorder.start();
        this.recorder.continuous = true;
        this.recorder.interimResults = true;
        this.recorder.lang = 'en-US';

        this.startTimestamp = startTimestamp;
    }

    stop() {
        if (!this.recorder) {
            return;
        }
        this.recorder.stop();
    }

    onEndOfSpeechRecognition(event) {
        if (this.ignoreOnEnd) {
            return;
        }
    }

    onErrorOfSpeechRecognition(event) {
        if (event.error == 'no-speech') {
            this.ignoreOnEnd = true;
            console.log('ignoreOnEnd');
        }
        if (event.error == 'audio-capture') {
            this.ignoreOnEnd = true;
            console.log('error');
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - this.startTimestamp < 100) {
                console.log('info_blocked');
            } else {
                console.log('info_denied');
            }
            this.ignoreOnEnd = true;
        }
        console.log(event.error);
    }

    onResultOfSpeechRecognition(event) {
        let result = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            console.log(event.results[i]);
            if (event.results[i].isFinal) {
                result += event.results[i][0].transcript;
            }
        }
        this.result = result;
        return result;
    }
}

var webRecognition = new WebRecognition();

export default webRecognition;