/**
 * Created by Peter Hoang Nguyen on 3/19/2017.
 */
import {combineReducers} from 'redux'
import user from './UserReducer';

const AppStore = combineReducers({
    user
});

export default AppStore;