import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

export default (props: RouteComponentProps<{ id: string }>) => {
    return <div>{props.match.params.id}</div>
}