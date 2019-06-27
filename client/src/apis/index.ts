import wretch, { WretcherOptions } from 'wretch';

let token = '';
const URL = 'http://a667e88b.ngrok.io';

export function setToken(t: string) {
    token = t;
}

function start(endpoint: string, options?: WretcherOptions) {
    return wretch(endpoint, options).headers({ token: token });
}

interface UserRepoResponse {
    urls: string[];
}

export async function userrepo(gitToken: string) {
    return start(URL + '/api/v1/gitloader/userrepo')
        .headers({ gitToken })
        .get()
        .json(json => {
            return (json as UserRepoResponse).urls;
        })
        .catch(error => {
            console.log('userrepo error', error);
            return undefined;
        });
}
