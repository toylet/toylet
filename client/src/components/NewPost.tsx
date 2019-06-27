import * as React from 'react';
import Editor from 'rich-markdown-editor';

const markdownTest = `
# Header 1
## Header 2
`;

export default class NewPost extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <input placeholder="Title" />
                    <span>Save</span>
                </div>
                <div>EDITOR 자리임</div>
                <div style={{ margin: 50 }}>
                    <Editor defaultValue={markdownTest} />
                </div>
            </div>
        );
    }
}
