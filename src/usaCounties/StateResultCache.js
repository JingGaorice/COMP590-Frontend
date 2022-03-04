const resultMap = {};

export const storeStateInCache = (key, stateResult) => {
    resultMap[key] = stateResult;
}

export const isStateInCache = (key) => {
    return key in resultMap;
}

export const getStateInCache = (key) => {
    return resultMap[key];
}