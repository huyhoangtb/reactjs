/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */

import {PLAY_AUDIO, STOP_AUDIO} from '../actions/AudioPlayerAction'

const audioInitialState = {
    playing: false,
};

const audio = (state = audioInitialState, action) => {
    let newState = {};

    switch (action.type) {

        case PLAY_AUDIO:
            state.playing = true;
            newState = Object.assign({}, state, {
                playing: true,
                recognitionResult: action.recognitionResult
            });

            break;

        case STOP_AUDIO:

            newState = Object.assign({}, state, {
                playing: false,
                recognitionResult: action.recognitionResult
            });

            break;
    }
    return newState
}

export default audio;