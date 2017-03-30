/**
 * Created by Peter Hoang Nguyen on 3/19/2017.
 */
import {combineReducers} from 'redux'
import user from 'reducers/user-reducer';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


const AppReducers = combineReducers({
    user,
    router: routerReducer,
    form: formReducer
});

export default AppReducers;