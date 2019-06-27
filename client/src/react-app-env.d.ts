/// <reference types="react-scripts" />

interface ITokenProps {
    token: String | null;
}

declare module 'rich-markdown-editor' {
    interface Props {
        defaultValue: String;
    }

    export interface Theme {
        almostBlack: string,
        lightBlack: string,
        almostWhite: string,
        white: string,
        white10: string,
        black: string,
        black10: string,
        primary: string,
        greyLight: string,
        grey: string,
        greyMid: string,
        greyDark: string,

        fontFamily: string,
        fontWeight: number | string,
        link: string,
        placeholder: string,
        textSecondary: string,
        textLight: string,
        selected: string,

        background: string,
        text: string,

        toolbarBackground: string,
        toolbarInput: string,
        toolbarItem: string,

        blockToolbarBackground: string,
        blockToolbarTrigger: string,
        blockToolbarTriggerIcon: string,
        blockToolbarItem: string,

        quote: string,
        codeBackground?: string,
        codeBorder?: string,
        horizontalRule: string,

        hiddenToolbarButtons?: HiddenToolbarButtons,
    };

    export default class Editor extends React.Component<Props> {}
}
