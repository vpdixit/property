import axios from 'axios';

export async function post(url, params, callback) {
const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: params
    };

try {
            await fetch(url, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            callback(data);
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
}
