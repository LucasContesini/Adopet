export function signIn(email, password) {
    return {
        type: '@auth/SIGN_IN',
        payload: { email, password }
    }
}

export function signInSuccess(token) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token }
    }
}

export function signOutAuth() {
    return {
        type: '@auth/SIGN_OUT',
        payload: { }
    }
}


export function signInFailed() {
    return {
        type: '@auth/SIGN_IN_FAILED',
        payload: {}
    }
}

export function signUp(nickname, email, password) {
    return {
        type: '@auth/SIGN_UP',
        payload: { nickname, email, password }
    }
}

export function signUpSuccess(id, email, nickname) {
    return {
        type: '@auth/SIGN_UP_SUCCESS',
        payload: { id, email, nickname }
    }
}

export function signUpFailed() {
    return {
        type: '@auth/SIGN_UP_FAILED',
        payload: {}
    }
}

export function getUserInfo() {
    return {
        type: '@auth/GET_USER_INFO',
        payload: {}
    }
}

export function getUserInfoSuccess(id, email, nickname, uid) {
    return {
        type: '@auth/GET_USER_INFO_SUCCESS',
        payload: { id, email, nickname, uid }
    }
}