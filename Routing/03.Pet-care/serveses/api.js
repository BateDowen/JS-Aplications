const baseUrl = 'http://localhost:3030';

async function request (method,url,data){
    const options = {
        method,
        headers: {}
    };
    if (data != undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    };

    try {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            options.headers['X-authorization'] = user.accessToken;
        };

        const response = await fetch(baseUrl + url, options);
        if (!response.ok) {
            if (response.status == '403') {
                localStorage.removeItem('user');
            };
            
            const err = await response.json() ;
            throw new Error(err.message);
        };
        if (response.status == '204') {
            return response;
        };
        return response.json();
        
    } catch (error) {
        alert(error.message);
        throw new error;

    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
