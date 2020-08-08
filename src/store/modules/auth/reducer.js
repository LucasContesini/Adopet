import produce from 'immer';

const INITIAL_STATE = {
    token: '',
    loginFailed: false,
    id: 0,
    uid: '',
    email: '',
    nickname: '',
    emailConflict: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                draft.loginFailed = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.token = '';
                draft.id = 0;
                draft.uid = '';
                draft.email = '';
                draft.nickname = '';
                break;
            }
            case '@auth/SIGN_IN_FAILED': {
                draft.loginFailed = true;
                draft.token = '';
                break;
            }
            case '@auth/SIGN_UP_SUCCESS': {
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                draft.emailConflict = false;
                break;
            }
            case '@auth/GET_USER_INFO_SUCCESS': {
                draft.id = action.payload.id;
                draft.uid = action.payload.uid;
                draft.email = action.payload.email;
                draft.nickname = action.payload.nickname;
                break;
            }
            case '@auth/SIGN_UP_FAILED': {
                draft.emailConflict = true;
                draft.id = '';
                draft.email = '';
                draft.nickname = '';
                break;
            }
        }
    });
}