import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export default (props: RouteComponentProps<{ id: string }>) => {
    const data = {
        name: 'AwesomeProject'
    };

    return (
        <div>

            <h1>
                {data.name} ({props.match.params.id})
            </h1>
            <Link to={props.location.pathname + '/new-post'}>New Post</Link>
        </div>
    );
};
