export const apiGet = (url, funcClose) => ()  => fetch(url).then(v => v.json()).then(r => {
    funcClose();
    return r;
});

export const apiPost = (url, params, funcClose) => () =>
    fetch(`${url}`, {
        method: 'POST',
        body: params,
        headers: new Headers(
            {   'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',                
            })
    })
        .then(v => {
            return v;
        })
        .then(r => {
            funcClose();
            return r;
        });
