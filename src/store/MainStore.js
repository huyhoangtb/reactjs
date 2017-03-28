/**
 * Created by Peter Hoang Nguyen on 3/19/2017.
 */
import {combineReducers} from 'redux'
import recognition from '../reducers/RecognitionReducer';
import audio from '../reducers/AudioPlayerReducer';

const AppStore = combineReducers({
    audio,
    recognition
});

export default AppStore;