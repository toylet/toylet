import produce from 'immer';
import { ActionTypes, ProjectState } from './types';

const initialState: ProjectState = {
    byId: {},
    ids: [],
    page: 0,
    loading: false
};

function assocBy<T>(l: T[], k: (a: T) => string) {
    return l.reduce(
        (o, v) => {
            o[k(v)] = v;
            return o;
        },
        {} as { [key: string]: T }
    );
}

export function projectReducer(state = initialState, action: ActionTypes) {
    return produce(state, draftState => {
        switch (action.type) {
            case 'SET_PROJECT_LIST': {
                draftState.byId = assocBy(
                    action.payload.list,
                    project => project._id
                );
                draftState.ids = action.payload.list.map(item => item._id);
                draftState.page = action.payload.page;
                return;
            }
            case 'REQUEST_PROJECT_LIST': {
                draftState.loading = true;
                return;
            }
            case 'END_REQUEST_PROJECT_LIST': {
                draftState.loading = false;
                return;
            }
            case 'SELECT_PROJECT': {
                draftState.selectedProject = action.payload.project;
                return;
            }
            case 'ADD_POST_TO_PROJECT': {
                if (draftState.selectedProject)
                    draftState.selectedProject.posts.push(JSON.stringify(action.payload.post));
                return;
            }
        }
    });
}
