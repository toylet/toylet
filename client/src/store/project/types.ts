export interface ProjectState {
    byId: { [key: string]: Project };
    page: number;
    ids: string[];
    loading: boolean;

    selectedProject?: Project;
}

export interface Project {
    _id: string;
    title: string;
    posts: string[];
    lastUpdated: string;
}

interface SetProjectListAction {
    type: typeof SET_PROJECT_LIST;
    payload: SetProjectListActionPayload;
}

export const SET_PROJECT_LIST = 'SET_PROJECT_LIST';

interface SetProjectListActionPayload {
    list: Project[];
    page: number;
}

export const REQUEST_PROJECT_LIST = 'REQUEST_PROJECT_LIST';

interface RequestProjectListAction {
    type: typeof REQUEST_PROJECT_LIST;
    payload: {};
}

export const END_REQUEST_PROJECT_LIST = 'END_REQUEST_PROJECT_LIST';

interface EndRequestProjectListAction {
    type: typeof END_REQUEST_PROJECT_LIST;
    payload: {};
}

export const SELECT_PROJECT = 'SELECT_PROJECT';

interface selectProjectAction {
    type: typeof SELECT_PROJECT;
    payload: {
        project: Project;
    };
}

export type ActionTypes =
    | SetProjectListAction
    | RequestProjectListAction
    | EndRequestProjectListAction
    | selectProjectAction;
