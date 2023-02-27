const host = 'http://localhost:3030';

async function request(method,url,data) {
    const options ={
        method,
        headers: {}
    };
    if (data != undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data)
    };

    try {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const token = user.accessToken;
            options.headers['X-Authorization'] = token;
            
        };
        
        const responce = await fetch(host + url, options);
        if (!responce.ok) {
            if (responce.status == '403') {
                localStorage.removeItem('user');

            };
            const err = await responce.json();
            throw new Error(err.message);
        };
        if (responce.status == '204') {
            return responce;
        };
            return responce.json();
    } catch (error) {
        alert(error.message);
        throw error
    };

};
export const get = request.bind(null,'GET');
export const put = request.bind(null,'PUT');
export const post = request.bind(null,'POST');
export const del = request.bind(null,'DELETE');
