import wretch, { WretcherOptions } from 'wretch';
import { Project } from '../store/project/types';

let token = '';
const URL = 'http://localhost:8000';

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

export async function projectList() {
    return start(URL + '/api/v1/project')
        .get()
        .json(json => json.project);
}

export async function getProductDetail(id: string) {
    return start(URL + '/api/v1/project/' + id)
        .get()
        .json(json => json as Project);
}

export async function updateProject(projectId: string, projectData: Project) {
    return start(`${URL}/api/v1/project/${projectId}`)
        .put(projectData)
        .json(json => json);
}

export async function createProject(data: any) {
    return start(`${URL}/api/v1/project`)
        .post(data)
        .json(json => json);
}
