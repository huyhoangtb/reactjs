/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import {LOGIN_ACTION, LOGOUT_ACTION} from "actions/commons/user";

const audioInitialState = {
    playing: false,
};

const audio = (state = audioInitialState, action) => {
    let newState = {};
    switch (action.type) {

        case LOGIN_ACTION:
            state.playing = true;
            newState = Object.assign({}, state, {
                playing: true,
                recognitionResult: action.recognitionResult
            });
            break;

        case LOGOUT_ACTION:

            newState = Object.assign({}, state, {
                playing: false,
                recognitionResult: action.recognitionResult
            });

            break;
    }
    return newState
}

export default audio;