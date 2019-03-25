import { parse } from "querystring";

export const getAccessFromUrl = (isHash = false) => {
    const accessParam = isHash ? window.location.hash : window.location.search;
    const accessParamSplit = accessParam.split('access=');
    return accessParamSplit.length === 2 ? accessParamSplit[1] : null
};

export const stringAccessToObject = (stringAccess) => {
    const splitAccess = stringAccess !== null ? stringAccess.split('\'') : null;
    return splitAccess.length === 3 ? parse(splitAccess[1]) : null;
}

export const paramsHasProperties = (urlParams, properties) => {
    let hasProperties = true;
    properties.forEach(param => !urlParams.hasOwnProperty(param) ? hasProperties = false : null)
    return hasProperties;
};

export const getUrlParams = (isHash = false) => {
    const parsed = isHash
        ? parse(window.location.hash)
        : parse(window.location.search);
    return Object.keys(parsed)
        .reduce((acumulator, next) => (
            { ...acumulator, [next.split('?')[next.split('?').length - 1]]: parsed[next] }), {}
        );
};