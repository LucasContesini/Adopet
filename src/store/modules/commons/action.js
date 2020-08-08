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

export function setFirstAccess() {
    return {
        type: '@commons/SET_FIRST_ACCESS',
        payload: { }
    }
}

export function setSearchInfo(type, vaccinated, castrated) {
    return {
        type: '@commons/SET_SEARCH_INFO',
        payload: { type, vaccinated, castrated }
    }
}