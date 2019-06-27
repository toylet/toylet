import {
    END_REQUEST_PROJECT_LIST,
    Project,
    REQUEST_PROJECT_LIST,
    SELECT_PROJECT,
    SET_PROJECT_LIST
} from './types';

export function setProjectList(list: Project[], page: number) {
    return {
        type: SET_PROJECT_LIST,
        payload: {
            list,
            page
        }
    };
}

export function requestProjectList() {
    return {
        type: REQUEST_PROJECT_LIST
    };
}

export function endRequestProjectList() {
    return {
        type: END_REQUEST_PROJECT_LIST
    };
}

export function selectProject(proj: Project) {
    return {
        type: SELECT_PROJECT,
        payload: {
            project: proj
        }
    };
}
