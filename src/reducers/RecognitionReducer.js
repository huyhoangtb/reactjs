/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */

import {
    START_RECOGNITION_ACTION,
    STOP_RECOGNITION_ACTION,
    INIT_RECOGNITION_TEXT_ACTION,
    VOICE_RECOGNITION_RESULT_ACTION,
    CLEAR_RECOGNITION_ACTION
} from '../actions/RecognitionAction'

const recognitionInitialState = {
    recognizing: false
}


const Recognition = (state = recognitionInitialState, action) => {
    let newState = {};
    switch (action.type) {
        case START_RECOGNITION_ACTION:
            newState = Object.assign({}, ...state, {
                recognizing: true
            });

            break;

        case CLEAR_RECOGNITION_ACTION:
            newState = Object.assign({}, ...state, {
                recognizing: false,
                result: false
            });

            break;

        case STOP_RECOGNITION_ACTION:
            newState = Object.assign({}, ...state, {
                recognizing: false,
                result: state.result
            });

            break;

        case INIT_RECOGNITION_TEXT_ACTION:
            console.log(1111111);
            newState = Object.assign({}, ...state, {
                text: action.text,
                phonic: action.phonic
            });

            break;

        case VOICE_RECOGNITION_RESULT_ACTION:
            console.log(1111111);
            newState = Object.assign(state, state, {
                result: action.result
            });

            break;
    }
    return newState
}

export default Recognition;