export const apiGetParam = (url, param) => () => fetch(`${url}/${param}`).then(v => v.json());
export const apiPost = (url, obj, funcClose) => () =>
    fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-type': 'application/json' })
    })
        .then(v => {
            return v.json();
        }) 
        .then(r => {
            funcClose();
            return r;
        });