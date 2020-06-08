const INITIAL_STATE = {
    token: '',
    loginFailed: false,
};

export default function auth(state = INITIAL_STATE, action) {
    switch(action.type) {
        case '@auth/SIGN_IN_SUCCESS': {
            INITIAL_STATE.token = action.payload.token;
            INITIAL_STATE.loginFailed = false;
            break;
        }
        case '@auth/SIGN_IN_FAILED': {
            INITIAL_STATE.loginFailed = true;
            INITIAL_STATE.token = '';
            break;
        }
    }
    return INITIAL_STATE;
}