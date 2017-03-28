/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export const login = () =>(username, password, isRemember) => {
    return {type: LOGIN_ACTION, username, password, isRemember}
}

export const logout = (redirectionURL) => {
    return {type: LOGOUT_ACTION, redirectionURL}
}