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