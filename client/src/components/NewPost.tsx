import * as React from 'react';
import Editor, { OnChange, Theme } from 'rich-markdown-editor';

import styles from './NewPost.module.scss';

const markdownTemplate = `
# Summary
## Task 1

Write your task's description

# Next Day TODOs
- A
- B
- C
`;

const colors = {
    almostBlack: '#181A1B',
    lightBlack: '#2F3336',
    almostWhite: '#E6E6E6',
    white: '#FFF',
    white10: 'rgba(255, 255, 255, 0.1)',
    black: '#000',
    black10: 'rgba(0, 0, 0, 0.1)',
    primary: '#1AB6FF',
    greyLight: '#F4F7FA',
    grey: '#E8EBED',
    greyMid: '#9BA6B2',
    greyDark: '#DAE1E9'
};

export const base = {
    ...colors,
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontFamilyMono:
        "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
    fontWeight: 400,
    link: colors.primary,
    placeholder: '#B1BECC',
    textSecondary: '#4E5C6E',
    textLight: colors.white,
    selected: colors.primary,
    codeComment: '#6a737d',
    codePunctuation: '#5e6687',
    codeNumber: '#d73a49',
    codeProperty: '#c08b30',
    codeTag: '#3d8fd1',
    codeString: '#032f62',
    codeSelector: '#6679cc',
    codeAttr: '#c76b29',
    codeEntity: '#22a2c9',
    codeKeyword: '#d73a49',
    codeFunction: '#6f42c1',
    codeStatement: '#22a2c9',
    codePlaceholder: '#3d8fd1',
    codeInserted: '#202746',
    codeImportant: '#c94922'
};

export const light: Theme = {
    ...base,
    background: colors.white,
    text: '#0c1c2d',
    code: colors.lightBlack,

    toolbarBackground: colors.lightBlack,
    toolbarInput: colors.white10,
    toolbarItem: colors.white,

    blockToolbarBackground: colors.greyLight,
    blockToolbarTrigger: colors.greyMid,
    blockToolbarTriggerIcon: colors.white,
    blockToolbarItem: colors.almostBlack,

    tableDivider: colors.grey,
    tableSelected: colors.primary,
    tableSelectedBackground: '#E5F7FF',

    quote: colors.greyDark,
    codeBackground: colors.greyLight,
    codeBorder: colors.grey,
    horizontalRule: colors.grey,
    imageErrorBackground: colors.greyLight
};

export default class NewPost extends React.Component<{}, { v: string }> {
    // TODO:: debounce
    onChange: OnChange = value => {
        this.setState({ v: value() });
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTextContainer}>
                        <input
                            className={styles.headerTextInput}
                            placeholder="Title"
                        />
                        <span className={styles.headerTextDate}>
                            June 27, 2019 | Beomjun Gil @Affect Script
                        </span>
                    </div>
                </div>
                <div className={styles.editorContainer}>
                    <div className={styles.editor}>
                        <Editor
                            onChange={this.onChange}
                            defaultValue={markdownTemplate}
                            theme={light}
                        />
                    </div>
                    <div className={styles.sidebar}>adsf</div>
                </div>
            </div>
        );
    }
}
