import gsAxios from ".";

export const createEntities = function () {
    return gsAxios.post('/createGame');
}


export const fetchEntities = function (token) {
    return gsAxios.get(`/entities?token=${token}`);
}


export const fetchActualUnit = function (token) {
    return gsAxios.get(`/getActualUnit?token=${token}`);
}


export const fetchMoves = function (token) {
    return gsAxios.get(`/potentialMoves?token=${token}`);
}


export const makeMove = function (token, newY, newX, unit) {
    const jsonText = JSON.stringify(unit);
    const encodedText = encodeURIComponent(jsonText);
    return gsAxios.post(`/move?token=${token}&newY=${newY}&newX=${newX}&text=${encodedText}`);
}

export const fetchStatus = function (token) {
    return gsAxios.get(`/gameStatus?token=${token}`);
}

export const fetchScore = function (token) {
    return gsAxios.get(`/getWinCost?token=${token}`);
}