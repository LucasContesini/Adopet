export function setRender() {
    return {
        type: '@commons/SET_RENDER',
        payload: { }
    }
}

export function setRegion(region) {
    return {
        type: '@commons/SET_REGION',
        payload: { region }
    }
}