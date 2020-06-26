const INITIAL_STATE = {
    token: '',
    loginFailed: false,
    id: '',
    email: '',
    nickname: '',
    emailConflict: false,
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
        case '@auth/SIGN_UP_SUCCESS': {
            INITIAL_STATE.id = action.payload.id;
            INITIAL_STATE.email = action.payload.email;
            INITIAL_STATE.nickname = action.payload.nickname;
            INITIAL_STATE.emailConflict = false;
            break;
        }
        case '@auth/GET_USER_INFO_SUCCESS': {
            INITIAL_STATE.id = action.payload.id;
            INITIAL_STATE.email = action.payload.email;
            INITIAL_STATE.nickname = action.payload.nickname;
            break;
        }
        case '@auth/SIGN_UP_FAILED': {
            INITIAL_STATE.emailConflict = true;
            INITIAL_STATE.id = '';
            INITIAL_STATE.email = '';
            INITIAL_STATE.nickname = '';
            break;
        }
    }
    return INITIAL_STATE;
}