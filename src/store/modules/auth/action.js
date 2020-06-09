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